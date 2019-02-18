const moment = require('moment');
const express = require('express');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const router = express.Router();
const Joi = require('joi');
const {User} = require('../models/user');
const {Rental} = require('../models/rental');
const {Movie} = require('../models/movie');


router.post('/', [auth, validate(validateReturn)], async (req, res) => {
        const rental = await Rental.lookup(req.body.customerId, req.body.movieId);


        if (!rental) return res.status(404).send('Rental not found');
        if (rental.dateReturned) return res.status(400).send('Return already processed');

        rental.return();

        await rental.save();

        await Movie.update({_id: rental.movie._id}, {
           $inc: {numberInStock: 1}
        });
        

        res.send(rental); // status 200 will be set by default
});

function validateReturn(req){
    const shema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    }
    return Joi.validate(req, shema);
}


module.exports = router;