const router = require('express').Router();
const userRoutes = require('./userRoutes');
const cmsRoutes = require('./cmsRoutes');
const commnetRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/cms', cmsRoutes);
router.use('/comment',commnetRoutes);

module.exports = router;
