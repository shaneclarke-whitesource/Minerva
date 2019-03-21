'use strict';
/**
 * @name parse
 * @description Add Pilot nav & PORTAL_DATA object to document
 * @param {string} toParse string to be parsed
 * @param {string} toReplace replaces the toParse info
 * @param {object} params contains user info userId, username, tokenId, & tenantId
 * @returns {string}
 */
let parsed = (toParse, toReplace, params) => {
    var output;
    output = toParse.replace('<pilot-nav></pilot-nav>', toReplace);
    output = output.replace('</head>', `<script>window.PORTAL_DATA = {"isRacker": false, "domainId": "${params.token.tenant.id}",
     "userId": "${params.user.id}", "username": "${params.user.name}", "tenants": ["cloud:${params.token.tenant.id}"]};</script></head>`);
    return output;
};

module.exports = parsed;
