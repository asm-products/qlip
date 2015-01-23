var config = require('./../config'),
    io     = require('socket.io'),
    Q      = require('q')
    ;

function Socket() {

}

Socket.prototype.setup = function () {
    var deferred = Q.defer();

    this.socket = io.listen(config.get('station_port'));

    this.socket.on('connect', function () {
        console.log('[Station] Socket client is connected.');
    });

    setTimeout(function () {
        deferred.resolve();
        console.log('Station socket is listening on port: ' + config.get('station_port'));
    }, 1000);

    return deferred.promise;
};

Socket.prototype.on = function () {
    return this.socket.on.apply(this.socket, arguments);
};

Socket.prototype.of = function () {
    return this.socket.of.apply(this.socket, arguments);
};

Socket.prototype.emit = function () {
    return this.socket.emit.apply(this.socket, arguments);
};

module.exports = new Socket();