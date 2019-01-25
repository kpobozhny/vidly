const {Genre, validate} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});


router.post('/', async (req, res) => {

    const { error } = validate(req.body); // equals to result.error in case if we would use: const result = validateGenre(req.body);
    if (error) return  res.status(400).send(error.details[0].message);
  

    const genre = new Genre({ name: req.body.name });
    await genre.save();
    res.send(genre);
});

router.put('/:id', async (req, res) => {

    // Validate
    // If invalid, return 400 - Bad request
    const { error } = validate(req.body); // equals to result.error in case if we would use: const result = validateGenre(req.body);
    if (error) {
        // 400 Bad request
        res.status(400).send(error.details[0].message);
        return;
    }

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true // to return an updated object, not the 'old' one
    })

    if(!genre) return res.status(404).send(`The genre with the given id=${req.params.id} was not found.`);

    res.send(genre);

});

// /api/genres/1
router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send(`The genre with the given id=${req.params.id} was not found.`); // 404
    res.send(genre);
});

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if(!genre) return res.status(404).send(`The genre with the given id=${req.params.id} was not found.`);
    res.send(genre);
});

module.exports = router;