const express = require('express');
const router = express.Router();
const Resources = require('./routes/resources');
const Monitors = require('./routes/monitors');
const Metrics = require('./routes/metrics');

//all Monitoring V2 routes
router.use('/salus/resources', Resources);
router.use('/salus/monitors', Monitors);

//all Metrics V2 routes
router.use('/metrics', Metrics);

module.exports = router