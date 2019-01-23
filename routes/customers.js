const {Customer, validate} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});


router.post('/', async (req, res) => {

    const { error } = validate(req.body); 
    if (error) return  res.status(400).send(error.details[0].message);
 
    let customer = new Customer({ name: req.body.name, phone: req.body.phone, isGold: req.body.isGold });
    customer = await customer.save();
    res.send(customer);
});

router.put('/:id', async (req, res) => {

    // Validate
    // If invalid, return 400 - Bad request
    const { error } = validate(req.body); 
    if (error) {
        // 400 Bad request
        res.status(400).send(error.details[0].message);
        return;
    }

    const customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name, phone: req.body.phone, isGold: req.body.isGold }, {
        new: true // to return an updated object, not the 'old' one
    })

    if(!customer) return res.status(404).send(`The customer with the given id=${req.params.id} was not found.`);

    res.send(customer);

});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if(!customer) return res.status(404).send(`The customer with the given id=${req.params.id} was not found.`); // 404
    res.send(customer);
});

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if(!customer) return res.status(404).send(`The customer with the given id=${req.params.id} was not found.`);
    res.send(customer);
});

module.exports = router;