var _            = require('lodash'),
    util         = require('util'),
    EventEmitter = require('events').EventEmitter;

function Product() {
    this.name = 'base';
    this.publicPath = '';
    this.category = '';
    this.assets = [];
    this.middleware = null;
}

Product.prototype.getName = function () {
    return this.name;
};

Product.prototype.getMiddleware = function () {
    return this.middleware;
};

Product.prototype.getCategory = function () {
    return this.category;
};

Product.prototype.getAssets = function () {
    return this.assets;
};

Product.prototype.getChannel = function () {
    return null;
};

Product.prototype.getPublicPath = function () {
    return this.publicPath;
};

module.exports = Product;