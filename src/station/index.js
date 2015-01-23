/**
 * This file is part of Qlip project.
 *
 * @package qlip
 */

var socket   = require('./socket'),
    products = require('../products'),
    orm      = require('../orm');

function Station() {
    this.channels = [];
}

Station.prototype.socket = function () {
    return socket;
};

Station.prototype.emit = function (thing, event, data) {
    console.log('Station.prototype.emit', thing, event, data);
};

Station.prototype.setup = function () {
    var me = this,
        channel;

    console.log('Setting up socket server...');

    socket.setup().then(function () {

        console.log('Registering products...');
        products.each(function (product) {
            channel = product.getChannel();

            if (channel) {
                channel.product = product;
                channel.orm = orm;
                channel.station = me;

                me.registerChannel(channel);
            }
        });
    });

};

// Register a channel into channels collection
Station.prototype.registerChannel = function (channel) {
    try {
        channel.run();
        this.channels.push(channel);
        console.log('[Station] Channel "' + channel.product.getName() + '" registered.');
    } catch (e) {
        console.log('[Station] Channel "' + channel.product.getName() + '" error.', e);
    }
};

module.exports = new Station();