const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const Joi = require('joi');
const {User} = require('../models/user');
const {Rental, validate} = require('../models/rental');

router.post('/', auth, async (req, res) => {

        //res.status(401).send('Unathorized');
        const { error } = validate(req.body); // equals to result.error in case if we would use: const result = validateGenre(req.body);
        if (error) return  res.status(400).send(error.details[0].message);
});

module.exports = router;