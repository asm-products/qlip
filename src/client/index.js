var express      = require('express'),
    config       = require('../config'),
    products     = require('../products'),
    api          = require('./api');

module.exports = function () {
    var app = express(),
        productScripts = []; // Products scripts to include on page

    app.set('views', __dirname + '/../views');
    app.set('view engine', 'jade');

    products.each(function (product) {
        var path = product.getPublicPath();

        if (path) {
            app.use('/products/' + product.getName() + '/public', express.static(path));
        }

        if (product.scripts) {
            productScripts = productScripts.concat(product.scripts);
        }
    });

    app.use('/api', api());

    app.use('/', function(req, res) {
        return res.render('app', {
            user: req.user,
            scripts: productScripts
        });
    });

    return app;
};