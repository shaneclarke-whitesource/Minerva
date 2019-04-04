'use strict';
var fs = require('fs');
var path = require('path');
var pilotMock = require('../mocks/pilot');
var pilot = {
    /**
     * @name createPilot
     * @description create portaldata.js file where <pilot-nav> gets overwritten by
     * dummy nav or legit one
     * @param {object} data this will be the data coming from Pilot API response
     */
    createPilot: (data) => {

        var pilotData = data || pilotMock.nav;
        var pilotscript = `var pilotNav = document.querySelector('pilot-nav');
        var newPilot = document.createElement('div'); newPilot.innerHTML=\`${pilotData}\`;
        pilotNav.parentNode.replaceChild(newPilot, pilotNav);`;

        let dir = path.join(__dirname, '../scripts');
        // create directory if it doesn't exists
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        // lastly write file to path
        fs.writeFileSync(path.join(__dirname, '../scripts/pilotdata.js'), pilotscript);
    }
};

module.exports = pilot;