var express = require('express');
var axios = require('axios');
var router = express.Router();
const Settings = require('../config/index');
var Identity = require('../services/identity/token');
const config = new Settings();

router.get('/resources', (req, res) => {
    let page = req.query.page;
    let size = req.query.size;
    axios.get(`${config.monitoring.api_host}${config.monitoring.api_url}/${Identity.info().token.tenant.id}/resources`, {
        params: {
            size,
            page
        },
        headers: { 'x-auth-token': Identity.info().token.id }

    }).then((data) => {
        res.send(data.data);
    })
    .catch((err) => {
        res.sendStatus(err.status).json(err);
    });
});


router.get('/resources/:id', (req, res) => {
    if (req.method === 'HEAD') {
        let id = req.params.id;
        axios.head(`${config.monitoring.api_host}${config.monitoring.api_url}/${Identity.info().token.tenant.id}/resources/${id}`,
            { headers: { 'x-auth-token': Identity.info().token.id } })
            .then((data) => {
                res.sendStatus(data.status);
            })
            .catch((err) => {
                res.sendStatus(err.status);
            });
    }
    else {
        let id = req.params.id;
        axios.get(`${config.monitoring.api_host}${config.monitoring.api_url}/${Identity.info().token.tenant.id}/resources/${id}`, {
            headers: { 'x-auth-token': Identity.info().token.id }
        }).then((data) => {
            res.send(data.data);
        })
        .catch((err) => {
            res.sendStatus(err.status).json(err);
        });
    }
});

router.post('/resources', (req, res) => {
    let resource = req.body;
    axios.post(`${config.monitoring.api_host}${config.monitoring.api_url}/${Identity.info().token.tenant.id}/resources`,
        resource, { headers: { 'x-auth-token': Identity.info().token.id } })
        .then((data) => {
            res.send(data.data);
        })
        .catch((err) => {
            res.sendStatus(err.status).json(err);
        });
});

router.put('/resources/:id', (req, res) => {
    let id = req.params.id;
    let updated = req.body;
    axios.put(`${config.monitoring.api_host}${config.monitoring.api_url}/${Identity.info().token.tenant.id}/resources/${id}`,
        updated, { headers: { 'x-auth-token': Identity.info().token.id } })
        .then((data) => {
            res.send(data.data);
        })
        .catch((err) => {
            res.sendStatus(err.status).json(err);
        });
});

router.delete('/resources/:id', (req, res) => {
    let id = req.params.id;
    axios.delete(`${config.monitoring.api_host}${config.monitoring.api_url}/${Identity.info().token.tenant.id}/resources/${id}`,
        { headers: { 'x-auth-token': Identity.info().token.id } })
        .then(() => {
            res.send(true)
        })
        .catch((err) => {
            res.sendStatus(err.status).json(err);
        });
});

module.exports = router;
