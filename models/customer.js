const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50      
    }
}));

function validateCustomer(customer){
    const shema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(15).required(),
        isGold: Joi.boolean()
    }

    return Joi.validate(customer, shema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;