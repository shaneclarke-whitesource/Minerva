const express = require('express');
const router = express.Router();
const Resources = require('./routes/resources');
const Monitors = require('./routes/monitors');
const Metrics = require('./routes/metrics');
const Labels = require('./routes/labels');
const ResourceSearch = require('./routes/resources-search');
const Schema = require('./routes/schema');
const Zones= require(`./routes/zones`)

//all Monitoring V2 routes
router.use('/salus', Labels);
router.use('/salus/resources-search', ResourceSearch);
router.use('/salus/schema', Schema);
router.use('/salus/resources', Resources);
router.use('/salus/monitors', Monitors);
router.use('/salus/zones',Zones)

//all Metrics V2 routes
router.use('/metrics', Metrics);

module.exports = router