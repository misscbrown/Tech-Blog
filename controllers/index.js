// This file exports all routers

const router = require('express').Router();

const userRoutes = require('./api/user-routes');
const homeRoutes = require('./homepage-routes');
const dashboardRoutes = require('./dashboard-routes');
const apiRoutes = require('./api')

router.use('/', homeRoutes);
router.use('/users', userRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;
