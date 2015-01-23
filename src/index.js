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
    var me = this;

    if (typeof settings !== 'undefined') {
        this.config(settings);
    }

    station.setup();
}

// Get or set config settings
Qlip.prototype.config = function (settings) {
    if (typeof settings === 'object') {
        config.set(settings);
    }

    return config;
};

Qlip.prototype.app = function () {
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