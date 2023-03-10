const express = require('express');
const userRoute = require('./api/userRoute');
const thoughtRoute = require('./api/thoughtRoute');

const router = express.Router();

router.use('/api/user', userRoute);
router.use('/api/thought', thoughtRoute);

module.exports = router;