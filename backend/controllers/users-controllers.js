const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        return next(
            new HttpError('Could not create user, please try again.', 500)
        );
    }

    const createdUser = new User({
        name,
        email,
        image: req.file.path,
        password: hashedPassword,
        places: []
    });

    try {
        await createdUser.save();
    } catch (err) {
        return next(
            new HttpError('Signup failed please try again later.')
        );
    }

    let token;
    try {
        token = jwt.sign(
            { userId: createdUser.id, email: createdUser.email },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
        );
    } catch (err) {
        return next(
            new HttpError('Something went wrong, please try again.', 500)
        )
    }

    res.status(201).json({ userId: createdUser.id, email: createdUser.email, token: token });
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

    if (!identifiedUser) {
        return next(
            new HttpError("Could not identify user.", 401)
        );
    }

    let isValidPassword;
    try {
        isValidPassword = await bcrypt.compare(password, identifiedUser.password);
    } catch (err) {
        return next(
            new HttpError('Login failed, please try again late.', 500)
        );
    }

    if (!isValidPassword) {
        return next(
            new HttpError('Invalid credentials, could not log you in.', 401)
        );
    }

    let token;
    try {
        token = jwt.sign(
            { userId: identifiedUser.id, email: identifiedUser.email },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
        );
    } catch (err) {
        return next(
            new HttpError('Something went wrong, please try again.', 500)
        )
    }

    res.json({ userId: identifiedUser.id, email: identifiedUser.email, token: token });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;