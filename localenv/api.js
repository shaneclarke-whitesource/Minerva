var express = require('express');
var router = express.Router();
var Salus = require('./routes/salus');

router.use('/salus', Salus);

module.exports = router;
