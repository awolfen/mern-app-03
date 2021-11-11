const jwt = require('jsonwebtoken');

const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
    // allows browser behaviour, sending an OPTIONS request (without headers) before any 'non-GET' request
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1]; // Authorization 'Bearer Token'
        if (!token) {
            throw new Error('Authentication failed');
        }
        const decodedToken = jwt.verify(token, 'supersecret_dont_share');
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (err) {
        return next(
            new HttpError('Authentication failed.', 401)
        );
    }



};