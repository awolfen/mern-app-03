const express = require('express');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');
const { MONGO_NAME, MONGO_PASSWORD } = require('./keys');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) { //check if a response has already been sent
        return next(error);
    }
    res.status(error.code || 500); // error 500 indicates something went wrong on the server -> default error
    res.json({ message: error.message || 'An unknown error occured.' });

});

mongoose
    .connect(`mongodb+srv://${MONGO_NAME}:${MONGO_PASSWORD}@merncoursecluster.vjw8x.mongodb.net/mern?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(5000);
    })
    .catch(err => {
        console.log('NAME: ' + MONGO_NAME + '| PASSWORD: ' + MONGO_PASSWORD);
        console.log(err);
    });