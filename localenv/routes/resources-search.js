var express = require('express');
var axios = require('axios');
var router = express.Router();
var Settings = require('../config/index');
var Identity = require('../services/identity/token');
const config = new Settings();

router.get('/', (req, res) => {
    let q = req.query.q;
    axios.get(`${config.monitoring.api_host}${config.monitoring.api_url}/${Identity.info().token.tenant.id}/resources-search/`, {
        params: {
            q
        },
        headers: { 'x-auth-token': Identity.info().token.id }
    }).then((data) => {
        res.send(data.data);
    })
    .catch((err) => {
        res.sendStatus(parseInt(err.response.status)).json(err);
    });
});

module.exports = router;
