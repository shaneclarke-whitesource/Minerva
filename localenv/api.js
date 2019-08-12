var express = require('express');
var router = express.Router();
var Salus = require('./routes/salus');
var Metrics = require('./routes/metrics');

//all Monitoring V2 routes
router.use('/salus', Salus);

//all Metrics V2 routes
router.use('/metrics', Metrics);

module.exports = router