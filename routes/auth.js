const bcrypt = require('bcryptjs');
const _ = require('lodash'); 
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

router.post('/', async (req, res) => {
    const { error } = validate(req.body); // equals to result.error in case if we would use: const result = validateGenre(req.body);
    if (error) return  res.status(400).send(error.details[0].message);
  
    let user = await User.findOne({ email: req.body.email});
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    res.send(true);
});

function validate(req){
    const shema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
        // you can use a npm library 'joi-password-complexity' to validate the password according to your requirements
    }

    return Joi.validate(req, shema);
}

module.exports = router;