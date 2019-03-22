'use strict';
var path = require('path');
var http = require('http');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var args = require('./arguments');
var Identity = require('./identity/token');
var Pilot = require('./pilot/index');
var Parse = require('./helpers/parse');
var browserSync = require('browser-sync');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));

let body = {};
var authInfo = {};
const port = 3000;

if (args.apikey) {
    body = {
        auth: {
            'RAX-KSKEY:apiKeyCredentials': {
                username: args.username,
                apiKey: args.apikey
            }
        }
    };
}
else {
    body = {
      auth: {
        passwordCredentials: {
          username: args.username,
          password: args.password
        }
      }
    };
}

console.log(`Starting with mocked ${process.env.NODE_ENV} environment`);
/* -- uncomment if wanting to debug all requests --
    const request = require('request');
    require('request-debug')(request);
*/

// Attempt to login against Rackspace Identity
Identity({'body': body}).then((response) => {

    authInfo.token = response.access.token;
    authInfo.user = response.access.user;

    let body = {
        "primary-nav": {
          "show": false
        }
    };

    // upon login get Pilot navigation
    return Pilot({'tenantId': authInfo.token.tenant.id, 'body': body, 'token': authInfo.token.id });

}, breakChain).then(async (pilotResponse) => {

    // after pilot success take Angular index file and add Pilot navigation
    try {
        let indexFile = await fs.readFileSync(path.join(__dirname, '../dist/intelligence/index.html'));
        let parsedHTML = Parse(indexFile.toString('utf8'), pilotResponse, authInfo);
        return await fs.writeFileSync('../dist/intelligence/index.html', parsedHTML);
    }
    catch (e) {
        return Promise.reject(e);
    }
}, breakChain).then(() => {

    // after successfully parsing and writing file to /dist folder create static site
    app.use(express.static(path.join(__dirname, '../dist')));
    var server = http.createServer(app);
    server.listen(port, 'dev.i.rax.io', () => {
        console.log(`\n \n 🚀 listening at http://dev.i.rax.io:${port}/intelligence \n\n`);
        browserSync({
            watch: true,
            files: [
                '../dist/intelligence/*.{html,js,css}',
                '../dist/intelligence/**/*.{html,js,css}'
            ],
            online: true,
            // this will open a new window each time the browser
            open: true,
            port: port + 1,
            reloadOnRestart: true,
            proxy: 'dev.i.rax.io:' + port + '/intelligence',
            ui: false
        });
    });
});

/**
 * @name breakChain
 * @description function breaks the chain of promises
 * @param {object} err
 */
function breakChain(err) {
    console.log('** Promise chain broken:\n ' + JSON.stringify(err));
    return Promise.reject(err);
}