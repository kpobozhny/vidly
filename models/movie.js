const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = require('./genre');

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        trim: true
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255              
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255              
    }
}));

function validateMovie(movie){
    const shema = {
        title: Joi.string().min(5).max(255).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    }

    return Joi.validate(movie, shema);
}

exports.Movie = Movie;
exports.validate = validateMovie;