const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true      
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: Boolean
});

// define a new method called 'generateAuthToken'
// any user with this schema will own this method as well
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user){
    const shema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
        // you can use a npm library 'joi-password-complexity' to validate the password according to your requirements
    }

    return Joi.validate(user, shema);
}

exports.User = User;
exports.validate = validateUser;
