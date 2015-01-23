var channel = {
    run: function () {
        var orm = this.orm,
            station = this.station,
            namespace = this.station.socket().of('/linux');

        console.log('[Channel] %s channel is running...', this.product.getName());

        namespace.use(function(socket, next) {
            if (socket.handshake.query &&
                socket.handshake.query.access_token) {

                var parts = socket.handshake.query.access_token.split(':');

                orm.Thing.find(parts[0]).then(function (thing) {

                    if (!thing) {
                        throw new Error('[Station] [Channel] [linux] Thing not found.', parts[0]);
                    }

                    try {
                        if (thing.config) {
                            thing.config = JSON.parse(thing.config);
                        }
                    } catch (e) {
                        throw e;
                    }

                    if (thing.config.token !== parts[1]) {
                        throw new Error('[Station] [Channel] [linux] Access token invalid.', socket.handshake.query.access_token);
                    }

                    socket.handshake.thing = thing;

                }, function (reason) {
                    throw reason;
                })
                ;

                next();

            } else {
                next(new Error('[Channel] [Linux] Not authorized.'));
            }
        });

        namespace.on('connection', function (socket) {
            console.log('[Channel] [linux] Connected a client ', socket.handshake.address);

            socket.on('clipboard', function (content) {
                station.emit('clipboard', socket.handshake.thing, content);
                console.log('[Channel] [linux] [clipboard]', content);
            });
        });

    }
};

module.exports = channel;