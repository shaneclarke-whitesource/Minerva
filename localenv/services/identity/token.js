
'use strict';
const request = require('request');
const Settings = require('../../config/index');

const config = new Settings();

/**
 * @name Authenticate
 * @description used to validate user and get auth token
 * @param {object} req
 * @param {object} response
 * @param {function} next
 * @return {Promise}
 */
function Authenticate(req, response, next) {
    return new Promise((resolve, reject) => {
        const options = {
            url: config.identity + '/tokens',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            json: req.body
        };

        request(options, (err, res, body) => {
            if (err || body.badRequest) {
                reject(err || body.badRequest);

            }
            resolve(body);
        });
    });
}


module.exports = Authenticate;

