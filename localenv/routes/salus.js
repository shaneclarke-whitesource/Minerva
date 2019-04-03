var express = require('express');
var router = express.Router();

router.get('/resources', (req, res) => {
    res.send('Get Overview of resources');
});

module.exports = router;
