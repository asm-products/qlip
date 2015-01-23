var client = require('./client'),
    config = require('./config'),
    auth   = require('./auth');

module.exports = function() {
    var express         = require('express'),
        passport        = require('passport'),
        app             = express();

    app.use(express.static(__dirname + '/public'));
    app.use(express.static(__dirname + '/../bower_components'));

    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');

    // Qlip homepage
    app.get('/home', function(req, res) {
        res.render('home', {
            user: req.user,
            title: config.title
        });
    });

    // Login page
    app.get('/login', function(req, res) {
        res.redirect('/auth/google');
    });

    // Authentication
    app.use(auth());

    // App client
    app.use(isAuthenticated, client());

    return app;
};

function isAuthenticated(req, res, next) {
    if (req.user && req.user.id)
        return next();

    res.redirect('/home');
}