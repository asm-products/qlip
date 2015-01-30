/**
 * This file is part of Qlip project.
 *
 * @package qlip
 */

var config   = require('../config'),
    products = require('../products'),
    orm      = require('../orm');

function Station() {

}

Station.prototype.emit = function (event, thing, data) {
    var clients = this.io.of('/').adapter.rooms[thing.user];

    for (var id in clients) {
        if (clients.hasOwnProperty(id)) {
            var socket = this.io.sockets.adapter.nsp.connected[id];
            if (socket.user === thing.user) {
                socket.emit(event, data);
            }
        }
    }
};

Station.prototype.start = function () {
    var me = this;

    me.io = require('socket.io').listen(config.get('station_port'));

    me.io.on('connect', function () {
        console.log('[Station] Socket client is connected.');
    });

    setTimeout(function () {
        console.log('[Station] Listening on port:' + config.get('station_port'));
        me.setup();
    }, 1000);
};

Station.prototype.setup = function () {
    var me = this,
        namespace = me.io.of('/');

    namespace.use(function(socket, next) {
        if (socket.handshake.query.access_token) {
            var access_token = socket.handshake.query.access_token;

            orm.Thing.find({ where: { access_token: access_token } }).then(function (thing) {

                if (!thing) {
                    throw new Error('[Station] Thing not found ' + access_token + '.');
                }

                socket.handshake.thing = thing;
                socket.join(thing.user);
                socket.emit('room', thing.user);
                socket.user = thing.user;

            }, function (reason) {
                throw reason;
            })
            ;

            next();

        } else {
            next(new Error('[Station] Not authorized request.'));
        }
    });

    me.io.on('connection', function (socket) {
        socket.on('clipboard', function (content) {
            me.emit('clipboard', socket.handshake.thing, content);
        });
    });
};

module.exports = new Station();