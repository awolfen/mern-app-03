const axios = require('axios');
const HttpError = require('../models/http-error');

const { GOOGLE_GEOCODING } = require('../keys');
const API_KEY = GOOGLE_GEOCODING;

const getCoordsForAddress = async (address) => {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`);

    const data = response.data;

    if (!data || data.status === 'ZERO_RESULTS') {
        return next(
            new HttpError('Could not find location for specified address', 404)
        );
    }

    const coordinates = data.results[0].geometry.location;

    return coordinates;
};

module.exports = getCoordsForAddress;