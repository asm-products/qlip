var
    config         = require('./config'),
    express        = require('express'),
    passport       = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function () {
    var app = express();

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new GoogleStrategy({
            clientID: config.thirdparty.google.GOOGLE_CLIENT_ID,
            clientSecret: config.thirdparty.google.GOOGLE_CLIENT_SECRET,
            callbackURL: config.server.url + "/auth/google/callback"
        },
        function(token, tokenSecret, profile, done) {
            var user = {
                id: profile.id,
                avatar: profile._json.picture,
                provider: profile.provider,
                fullname: profile.displayName,
                email: profile.emails[0].value
            };

            done(null, user);
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    app.get('/logout', function (req, res, next) {
        req.session.destroy();
        req.logout();
        res.redirect('/');
    });

    app.get('/auth/google', passport.authenticate('google', {
        scope: 'https://www.googleapis.com/auth/userinfo.email'
    }));

    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/login' }),
        function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        });

    return app;
};