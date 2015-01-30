var util    = require("util"),
    Product = require('../base');

function LinuxProduct() {
    Product.prototype.constructor.apply(this, arguments);

    this.name = 'linux';
    this.driver = 'AgentLinuxDriver';
    this.publicPath = __dirname + '/public';

    this.scripts = [
        'products/linux/public/translation/en.js',
        'products/linux/public/AgentLinuxDriver.js'
    ];
}

util.inherits(LinuxProduct, Product);


module.exports = LinuxProduct;