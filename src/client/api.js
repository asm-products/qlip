var orm        = require('../orm'),
    products   = require('../products'),
    config     = require('../config');

module.exports = function () {
    var express  = require('express'),
        app      = express();

    app.get('/config', function (req, res) {
        res.json({
            GOOGLE_CLIENT_ID: config.thirdparty.google.GOOGLE_CLIENT_ID
        });
    });

    app.get('/products', function (req, res) {
        res.json(products.getAll());
    });

    app.get('/things', isAuthenticated, function (req, res) {
        orm.Thing.findAll({
            where: {
                user: req.user.id
            }
        }).then(function (things) {
            res.json(things);
        }, function (reason) {
            res.status(500).json({ error: reason });
        })
        ;
    });

    app.post('/things', isAuthenticated, function (req, res) {
        orm.Thing.create({
            user: req.user.id,
            nickname: req.param('nickname'),
            product: req.param('product'),
            config: JSON.stringify(req.param('config'))
        }).then(function (thing) {
            res.json(thing);
        }, function (reason) {
            res.status(500).json({ error: reason });
        })
        ;
    });

    app.patch('/things/:id', isAuthenticated, function (req, res) {
        orm.Thing.update(
            {
                nickname: req.param('nickname'),
                config: JSON.stringify(req.param('config'))
            },
            {
                where: {
                    id: req.param('id'),
                    user: req.user.id
                }
            }
        ).then(function (affectedRows) {
                if (affectedRows > 0) {
                    res.json({affectedRows: affectedRows});
                }
            }, function (reason) {
                res.status(500).json({ error: reason });
            });
    });

    app.delete('/things/:id', isAuthenticated, function (req, res) {
        orm.Thing.destroy(
            {
                where: {
                    id: req.param('id'),
                    user: req.user.id
                }
            }
        ).then(function (affectedRows) {
                if (affectedRows > 0) {
                    res.json({affectedRows: affectedRows});
                }
            }, function (reason) {
                res.status(500).json({ error: reason });
            });
    });

    return app;
};

function isAuthenticated(req, res, next) {
    if (req.user) {
        return next();
    }

    res.status(401).json({
        success: false,
        error: 'You are not authenticated'
    });
}
