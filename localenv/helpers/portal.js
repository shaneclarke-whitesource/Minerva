'use strict';
var fs = require('fs');
var path = require('path');
var portalMock = require('../mocks/portal');
var portal = {
    /**
     * @name createPortal
     * @description create portal data js file and add PORTAL_DATA property
     * to the window object as an object
     * @param {object} data represents authorized user info
     */
    createPortal: (data) => {
        var portalData;
        if (data) {
            portalData = `window.PORTAL_DATA = {isRacker:false, userId: "${data.user.id}",
            username:'${data.user.id}', domainId: '${data.token.tenant.id}', tenants:['cloud:${data.token.tenant.id}']};`;
        }
        else {
            portalData = portalMock.data;
        }
        // finally write file to path
        fs.writeFileSync(path.join(__dirname, '../scripts/portaldata.js'), portalData);
    }
};

module.exports = portal;
