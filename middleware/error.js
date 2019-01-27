const winston = require('winston');

//winston.add(winston.transports.File, {filename: 'logfile.log'});

module.exports = function(err, req, res, next){
    winston.error(err.message, err);
    res.status(500).send('Something failed!');
}