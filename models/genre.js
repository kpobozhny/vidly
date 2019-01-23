const mongoose = require('mongoose');
const Joi = require('joi');

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));

function validateGenre(genre){
    const shema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre, shema);
}

exports.Genre = Genre;
exports.validate = validateGenre
