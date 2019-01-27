require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const error = require('./middleware/error');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const auth = require('./routes/auth');
const users = require('./routes/users');
const rentals = require('./routes/rentals');
const movies = require('./routes/movies');
const customers = require('./routes/customers');
const genres = require('./routes/genres');
const home = require('./routes/home');
const express = require('express');
const app = express();

winston.handleExceptions(new winston.transports.File({filename: 'uncaughtExceptions.log'}));

process.on('unhandledRejection', (ex) => {
    throw ex;
});

winston.add(winston.transports.File, { filename: 'logfile.log' });
winston.add(winston.transports.MongoDB, { 
    db: 'mongodb://localhost/vidly',
    level: 'error'
 });

const p = Promise.reject(new Error('Something failed miserbly!'));
p.then(() => console.log('Done'));

if (!config.get('jwtPrivateKey')){
    console.log('FATAL ERROR: jwtPrivateKey is not defined!')
    process.exit(1);
}


mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB..', err))

app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/rentals', rentals);
app.use('/api/movies', movies);
app.use('/api/customers', customers);
app.use('/api/genres', genres);
app.use('/', home);

app.use(error);


// PORT
const port = process.env.PORT || 3000;
app.listen(3000, () => {console.log(`Listening on port ${port}...`)});
