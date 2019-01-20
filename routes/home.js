const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'VIDLY', message: 'Hello there!'} );
});

module.exports = router;