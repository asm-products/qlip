var
    express      = require('express'),
    cookieParser = require('cookie-parser'),
    session      = require('express-session'),
    bodyParser   = require('body-parser'),
    station      = require('./station'),
    products     = require('./products'),
    routes       = require('./routes'),
    config       = require('./config');

function Qlip(settings) {
    if (typeof settings !== 'undefined') {
        this.config(settings);
    }

    station.start();
}

// Get or set config settings
Qlip.prototype.config = function (settings) {
    if (typeof settings === 'object') {
        config.set(settings);
    }

    return config;
};

// Get web app express instance
Qlip.prototype.getApp = function () {
    var app = express();

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(session({
        resave: false,
        saveUninitialized: false,
        secret: config.get('session_secret')
    }));

    // Routes
    app.use(routes(config));

    return app;
};

module.exports = Qlip;