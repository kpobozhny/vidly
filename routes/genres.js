const express = require('express');
const router = express.Router();
const Joi = require('joi');

const genres = [
    { id: 1, name: 'genre 1'},
    { id: 2, name: 'genre 2'},
    { id: 3, name: 'genre 3'}
]

router.get('/', (req, res) => {
    res.send(genres);
});


router.post('/', (req, res) => {

    const { error } = validateGenre(req.body); // equals to result.error in case if we would use: const result = validateGenre(req.body);
    if (error) return  res.status(400).send(error.details[0].message);
  

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

router.put('/:id', (req, res) => {
    
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send(`The genre with the given id=${req.params.id} was not found.`);

    // Validate
    // If invalid, return 400 - Bad request
 
    const { error } = validateGenre(req.body); // equals to result.error in case if we would use: const result = validateGenre(req.body);
    if (error) {
        // 400 Bad request
        res.status(400).send(error.details[0].message);
        return;
    }

    // Update genre
    genre.name = req.body.name;
    res.send(genre);

});

function validateGenre(genre){
    const shema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(genre, shema);
}


// /api/genres/1
router.get('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send(`The genre with the given id=${req.params.id} was not found.`); // 404
    res.send(genre);
});

router.delete('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send(`The genre with the given id=${req.params.id} was not found.`);

    // Delete
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);

});

module.exports = router;