var express = require('express');
var path = require('path');
var router = express.Router();
var devEnv = process.env.NODE_ENV === 'dev';
var mockPath = path.join(__dirname, '../../src/app/_mocks');

router.get('/resources', (req, res) => {
    if (devEnv) {
        let page = req.query.page;
        let take = req.query.size;
        const data = require(`${mockPath}/resources/collection.json`);
        res.json(data);
    }

    res.send({});
    /*
        TODO: since we're working with either a staging or prod env
        make request here for Resources
    */

});


router.get('/resources/:id', (req, res) => {
    if (devEnv) {
        const data = require(`${mockPath}/resources/single.json`);
        res.json(data);
    }

    /*
        TODO: since we're working with either a staging or prod env
        make request here for a Resource
    */

});


module.exports = router;
