var express = require('express');
var router = express.Router();
var Resources = require('./routes/resources');
var Monitors = require('./routes/monitors');
var Metrics = require('./routes/metrics');

//all Monitoring V2 routes
router.use('/salus/resources', Resources);
router.use('/salus/monitors', Monitors);

//all Metrics V2 routes
router.use('/metrics', Metrics);

module.exports = router