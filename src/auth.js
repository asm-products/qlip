var
    config         = require('./config'),
    express        = require('express'),
    passport       = require('passport'),
    orm            = require('./orm'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function () {
    var app = express();

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new GoogleStrategy({
            clientID: config.get('google_client_id'),
            clientSecret: config.get('google_client_secret'),
            callbackURL: config.get('server_url') + "/auth/google/callback"
        },
        function(token, tokenSecret, profile, done) {
            var user = {
                id: profile.id,
                avatar: profile._json.picture,
                provider: profile.provider,
                fullname: profile.displayName,
                email: profile.emails[0].value
            };

            orm.User.find(profile.id)
                .success(function (userRow) {
                    userRow.id = user.id;
                    userRow.avatar = user.avatar;
                    userRow.provider = user.provider;
                    userRow.fullname = user.fullname;
                    userRow.email = user.email;
                    userRow.save();
                })
                .fail(function () {
                    orm.User.create(user);
                })
            ;

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