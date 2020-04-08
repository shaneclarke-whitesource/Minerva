const express = require('express');
const router = express.Router();
const Resources = require('./routes/resources');
const Monitors = require('./routes/monitors');
const Metrics = require('./routes/metrics');
const Labels = require('./routes/labels');
const Schema = require('./routes/schema');

//all Monitoring V2 routes
router.use('/salus', Labels);
router.use('/salus/schema', Schema);
router.use('/salus/resources', Resources);
router.use('/salus/monitors', Monitors);

//all Metrics V2 routes
router.use('/metrics', Metrics);

module.exports = router