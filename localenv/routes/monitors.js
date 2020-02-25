var express = require('express');
var axios = require('axios');
var router = express.Router();
var Settings = require('../config/index');
var Identity = require('../services/identity/token');
const config = new Settings();

router.get('/', (req, res) => {
    let page = req.query.page;
    let size = req.query.size;
    axios.get(`${config.monitoring.api_host}${config.monitoring.api_url}/${Identity.info().token.tenant.id}/monitors`, {
        params: {
            size,
            page
        },
        headers: { 'x-auth-token': Identity.info().token.id }

    }).then((data) => {
        res.send(data.data);
    })
    .catch((err) => {
        res.sendStatus(parseInt(err.response.status)).json(err);
    });
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    axios.get(`${config.monitoring.api_host}${config.monitoring.api_url}/${Identity.info().token.tenant.id}/monitors/${id}`, {
        headers: { 'x-auth-token': Identity.info().token.id }
    }).then((data) => {
        res.send(data.data);
    })
    .catch((err) => {
        res.sendStatus(parseInt(err.response.status)).json(err);
    });
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    axios.delete(`${config.monitoring.api_host}${config.monitoring.api_url}/${Identity.info().token.tenant.id}/monitors/${id}`, {
        headers: { 'x-auth-token': Identity.info().token.id }
    }).then((data) => {
        res.sendStatus(data.status);
    })
    .catch((err) => {
        res.sendStatus(parseInt(err.response.status)).json(err);
    });
})


module.exports = router;
