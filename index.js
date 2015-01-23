/**
 * This file is part of Qlip project.
 *
 * @package qlip
 */

var config = require('./src/config'),
    Qlip   = require('./src/index');

// Console colors
require('colors');

// Start the server
try {
    var qlip = new Qlip(config);

    qlip
        .app()
        .listen(config.server.port, config.server.host, function () {
            console.log(
                'Qlip is running...'.green,
                '\nYour site is now available on',
                config.server.url,
                '\nCtrl+C to shut down'.grey
            );
        });
} catch (error) {
    console.log('Qlip could not run.'.red, error);
    process.exit();
}