var express = require('express');
var path = require('path');
var axios = require('axios');
var config = require('../config');
var router = express.Router();
var devEnv = process.env.NODE_ENV === 'dev';
var mockPath = path.join(__dirname, '../../src/app/_mocks');

router.get('/', (req, res) => {
    let db = req.query.db;
    let q = req.query.q;

    if (devEnv) {
        returnJSON(q).then((data) => {
            res.json(data);
        });
    }
    else {
        axios.get(`${config.metrics.api_host}${config.metrics.api_url}`, {
            params: {
                db,
                q
            }
        })
        .then((data) => {
            res.json(data.data);
        })
        .catch((err) => {
            res.sendStatus(500).json(err);
        });
    }
});


/**
 * Returns JSON depending on type of query
 * @param {string} q query to be parsed
 */
function returnJSON(q) {
    return new Promise((resolve, reject) => {
        let queryType = findQuery(q);
        let data;
        switch (queryType) {
            case 'measurements':
                data = require(`${mockPath}/metrics/measurements.json`);
                resolve(data);
            case 'fields':
                data = require(`${mockPath}/metrics/fields.json`);
                resolve(data);
            case 'devices':
                data = require(`${mockPath}/metrics/devices.json`);
                resolve(data);
            case 'metrics':
                data = require(`${mockPath}/metrics/metrics.json`);
                resolve(data);
        }
    });
}

function findQuery(string) {
    if (string.includes('SHOW MEASUREMENTS')) {
        return 'measurements';
    }
    if (string.includes('SHOW FIELD KEYS FROM')) {
        return 'fields';
    }
    if (string.includes('"deviceLabel", "device" FROM')) {
        return 'devices';
    }
    if (string.includes('SELECT mean(')) {
        return 'metrics';
    }

}


module.exports = router;
