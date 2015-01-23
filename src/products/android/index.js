var util    = require('util'),
    channel = require('./channel'),
    Product = require('../base');

function AndroidProduct() {
    Product.prototype.constructor.apply(this, arguments);

    this.name = 'android';
    this.driver = 'AgentAndroidDriver';
    this.publicPath = __dirname + '/public';

    this.scripts = [
        'products/android/public/translation/en.js',
        'products/android/public/AgentAndroidDriver.js'
    ];
}

util.inherits(AndroidProduct, Product);

AndroidProduct.prototype.getChannel = function () {
    return channel;
};

module.exports = AndroidProduct;