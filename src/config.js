var _ = require('lodash');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

function Config(config) {
    this.settings = {};

    // Default configurations
    this.set(_.extend({

        station: {
            port: 2747
        },
        server: {
            url: 'http://localhost:2368',
            host: '127.0.0.1',
            port: 4119
        }

    }, config));
}

Config.prototype.set = function (config) {
    if (_.isObject(config[process.env.NODE_ENV])) {
        _.extend(this.settings, config[process.env.NODE_ENV]);
    } else {
        _.extend(this.settings, config);
    }
};

Config.prototype.get = function (name) {
    return process.env[name] || this.settings[name];
};

module.exports = new Config();

// Load settings into configuration object
try {
    module.exports.set(require('../settings') || {});
} catch(e) {
    console.error('Qlip could not locate settings.js, please create one from settings.example.js');
    process.exit();
}