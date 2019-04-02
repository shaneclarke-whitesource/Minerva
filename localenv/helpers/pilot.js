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

        fs.writeFileSync(path.join(__dirname, '../scripts/pilotdata.js'), pilotscript);
    }
};

module.exports = pilot;