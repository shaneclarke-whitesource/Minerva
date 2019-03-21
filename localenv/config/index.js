const settings = require('./settings.json');

module.exports = function(){
    switch(process.env.NODE_ENV){
        case 'dev':
            return Object.assign(settings.shared, settings.dev);

        case 'staging':
            return Object.assign({}, settings.shared, settings.staging);

        case 'prod':
            return Object.assign({}, settings.shared, settings.prod);

        default:
            return Object.assign(settings.shared, settings.dev);
    }
};