var
    //_          = require('lodash'),
    orm        = require('../orm'),
    products   = require('../products'),
    config     = require('../config');

module.exports = function () {
    var express  = require('express'),
        app      = express();

    app.get('/config', function (req, res) {
        res.json({
            // xxxxxx: config.get('xxxxxx')
        });
    });

    app.get('/user', function (req, res) {
        res.json(req.user);
    });

    app.get('/products', function (req, res) {
        //var products = _.map(products.getAll(), function(o) { return _.omit(o, ['publicPath']); });
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
            access_token: req.param('access_token')
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
                access_token: req.param('access_token')
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
