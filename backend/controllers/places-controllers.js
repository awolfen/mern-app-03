const fs = require('fs');

const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');
const Place = require('../models/place');
const User = require('../models/user');


const getPlaceById = async (req, res, next) => {
    const placeId = req.params.pid // pid from /:pid

    let place;
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        return next(
            new HttpError('Something went wrong, could not find place.', 500)
        );
    }

    if (!place) {
        return next(
            new HttpError('Could not find a place for the provided place id.', 404)
        );
    }
    res.json({ place: place.toObject({ getters: true }) }); // mongoose adds an id - getter to every document which return the id as a string, getters: true keeps this id and adds it to the created object
}

const getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.uid;

    let places;
    try {
        places = await Place.find({ creator: userId });
    } catch (err) {
        return next(
            new HttpError('Something went wrong, could not find places.', 500)
        );
    }

    if (!places || places.length === 0) {
        return next(
            new HttpError('Could not find a place for the provided user id.', 404)
        );
    }
    res.json({ places: places.map(p => p.toObject({ getters: true })) });
}

const createPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    const { title, description, address } = req.body;

    let coordinates;
    try {
        coordinates = await getCoordsForAddress(address);
    } catch (error) {
        return next(error);
    }

    const createdPlace = new Place({
        title,
        description,
        address,
        location: coordinates,
        image: req.file.path,
        creator: req.userData.userId
    });

    let user;
    try {
        user = await User.findById(req.userData.userId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find user.',
            500
        );
        return next(error);
    }

    if (!user) {
        const error = new HttpError('Could not find user for provided id.', 404);
        return next(error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdPlace.save({ session: sess });
        user.places.push(createdPlace);
        await user.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            'Creating place failed, please try again.',
            500
        );
        return next(error);
    }

    res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    const { title, description } = req.body;
    const placeId = req.params.pid;

    let place;
    try {
        place = await Place.findById(placeId)
    } catch (err) {
        return next(
            new HttpError('Something went wrong, could not update place.', 500)
        );
    }

    // ensure only logged in creator can edit their own places
    if (place.creator.toString() !== req.userData.userId) {
        return next(
            new HttpError('Invalid credentials, you cannot edit this place.', 401)
        );
    }

    place.title = title;
    place.description = description;

    try {
        await place.save();
    } catch (err) {
        return next(
            new HttpError('Something went wrong, could not update place.', 500)
        )
    }

    res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
    const placeId = req.params.pid;

    let place;
    try {
        place = await Place.findById(placeId).populate('creator', '-password'); // populate fetched the whole object (instead of just id), only works with schema relation
    } catch (err) {
        return next(
            new HttpError('Something went wrong, could not find place.', 500)
        );
    }

    if (!place) {
        return next(
            new HttpError('Something went wrong, could not find place for placeId.', 404)
        );
    }

    // ensure only logged in creator can delete their own places
    if (place.creator.id !== req.userData.userId) {
        return next(
            new HttpError('Invalid credentials, you cannot delete this place.', 401)
        );
    }

    const imagePath = place.image;

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await place.remove({ session: sess });
        place.creator.places.pull(place); // pull is a mongoose method that with remove an id
        await place.creator.save({ session: sess }); // place.creator works thanks to populate
        await sess.commitTransaction();
    } catch (err) {
        return next(
            new HttpError('Something went wrong, could not delete place.', 500)
        )
    }

    fs.unlink(imagePath, err => {
        console.log(err);
    });

    res.status(200).json({ message: `Place with id "${placeId}" deleted.` })
};


exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;

