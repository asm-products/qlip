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
                        throw new Error('[Station] [Channel] [android] Thing not found.', parts[0]);
                    }

                    try {
                        if (thing.config) {
                            thing.config = JSON.parse(thing.config);
                        }
                    } catch (e) {
                        throw e;
                    }

                    if (thing.config.token !== parts[1]) {
                        throw new Error('[Station] [Channel] [android] Access token invalid.', socket.handshake.query.access_token);
                    }

                    socket.handshake.thing = thing;

                }, function (reason) {
                    throw reason;
                })
                ;

                next();

            } else {
                next(new Error('[Channel] [android] Not authorized.'));
            }
        });

        namespace.on('connection', function (socket) {
            console.log('[Channel] [android] Connected a client ', socket.handshake.address);

            socket.on('clipboard', function (content) {
                station.emit('clipboard', socket.handshake.thing, content);
                console.log('[Channel] [android] [clipboard]', content);
            });
        });

    }
};

module.exports = channel;