const express = require('express');
const apiRoute = require('./api');
const router = express.Router();

router.use('/api', apiRoute);

router.use((req, res) => {
        return res.send('Wrong route');
});


module.exports = router;