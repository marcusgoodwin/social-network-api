const express = require('express');
const userRoutes = require('./api/userRoute');
const thoughtRoutes = require('./api/thoughtRoute');

const router = express.Router();

router.use('/api/user', userRoute);
router.use('/api/thought', thoughtRoute);

module.exports = router;