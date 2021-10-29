const uuid = require('uuid').v4;
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find({}, '-password');
    }
    catch (err) {
        return next(
            new HttpError('Could not fetch users please try again later.', 500)
        );
    }
    res.json({ users: users.map(u => u.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors);
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }
    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        return next(
            new HttpError('Sign up failed please try again later.', 500)
        );
    }

    if (existingUser) {
        return next(
            new HttpError("Email already registered to an account.", 422)
        );
    }

    const createdUser = new User({
        name,
        email,
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Minsc.jpg/200px-Minsc.jpg',
        password,
        places: []
    });

    try {
        await createdUser.save();
    } catch (err) {
        return next(
            new HttpError('Signup failed please try again later.')
        );
    }

    res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    let identifiedUser;
    try {
        identifiedUser = await User.findOne({ email: email });
    } catch (err) {
        return next(
            new HttpError('Login failed please try again later', 500)
        );
    }

    if (!identifiedUser || password !== identifiedUser.password) {
        return next(
            new HttpError("Could not identify user.", 401)
        );
    }

    res.json({ message: "Logged in!" })
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;