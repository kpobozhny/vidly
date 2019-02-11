const moment = require('moment');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const Joi = require('joi');
const {User} = require('../models/user');
const {Rental, validate} = require('../models/rental');
const {Movie} = require('../models/movie');

router.post('/', auth, async (req, res) => {

        const { error } = validate(req.body); // equals to result.error in case if we would use: const result = validateGenre(req.body);
        if (error) return  res.status(400).send(error.details[0].message);

        const rental = await Rental.findOne({
            'customer._id': req.body.customerId,
            'movie._id': req.body.movieId
        });
        if (!rental) return res.status(404).send('Rental not found');
        if (rental.dateReturned) return res.status(400).send('Return already processed');

        rental.dateReturned = new Date();
        const rentalDays = moment().diff(rental.dateOut, 'days');
        rental.rentalFee = rentalDays * rental.movie.dailyRentalRate;
        await rental.save();

        await Movie.update({_id: rental.movie._id}, {
           $inc: {numberInStock: 1}
        });
        

        res.status(200).send();
});

module.exports = router;