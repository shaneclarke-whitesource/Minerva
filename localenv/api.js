var express = require('express');
var router = express.Router();
var Resources = require('./routes/resources');
var Metrics = require('./routes/metrics');

//all Monitoring V2 routes
router.use('/salus', Resources);

//all Metrics V2 routes
router.use('/metrics', Metrics);

module.exports = router