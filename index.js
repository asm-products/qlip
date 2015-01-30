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
        // Start web application
        .getApp()
        .listen(config.get('server_port'), config.get('server_host'), function () {
            console.log(
                'Qlip is running...'.green,
                '\nYour site is now available on',
                config.get('server_url'),
                '\nCtrl+C to shut down'.grey
            );

        })
    ;

} catch (error) {
    console.log('Qlip could not run.'.red, error);
    process.exit(1);
}