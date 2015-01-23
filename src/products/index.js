var _    = require('lodash'),
    glob = require('glob');

function ProductRepository() {
    var products = [];

    // A collection of registered products
    this.products = products;

    // Read all product models
    _.each(glob.sync(__dirname + "/*/index.js"), function (file) {

        if (file === __filename)
            return;

        var module = require(file);
        products.push(new module());
    });

}

ProductRepository.prototype.each = function (callback) {
    return _.each(this.products, callback);
};

ProductRepository.prototype.getAll = function () {
    return this.products;
};

ProductRepository.prototype.find = function (name) {
    return _.find(this.products, function (product) {
        return product.getName() === name;
    });
};

module.exports = new ProductRepository();