const router = require('express').Router();
const userRoutes = require('./userRoutes');
const cmsRoutes = require('./cmsRoutes');

router.use('/users', userRoutes);
router.use('/cmss', cmsRoutes);

module.exports = router;
