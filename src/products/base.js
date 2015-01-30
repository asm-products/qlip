var _            = require('lodash'),
    util         = require('util'),
    EventEmitter = require('events').EventEmitter;

function Product() {
    this.name = 'base';
    this.publicPath = '';
    this.assets = [];
}

Product.prototype.getName = function () {
    return this.name;
};

Product.prototype.getAssets = function () {
    return this.assets;
};

Product.prototype.getPublicPath = function () {
    return this.publicPath;
};

module.exports = Product;