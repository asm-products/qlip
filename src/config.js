var _ = require('lodash');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

function Config(config) {
    // Default configurations
    this.set(_.extend({

        station: {
            port: '4119'
        },
        server: {
            url: 'http://localhost:2368',
            host: '127.0.0.1',
            port: '2368'
        }

    }, config));
}

Config.prototype.set = function (config) {
    if (_.isObject(config[process.env.NODE_ENV])) {
        _.extend(this, config[process.env.NODE_ENV]);
    } else {
        _.extend(this, config);
    }
};

module.exports = new Config();

// Load settings into configuration object
try {
    module.exports.set(require('../settings') || {});
} catch(e) {
    console.error('Qlip could not locate settings.js, please create one from settings.example.js');
    process.exit();
}