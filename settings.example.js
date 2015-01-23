var path = require('path'),
    settings;

settings = {
    // ### Production environment
    production: {
        "app_title": "Qlip",

        "database_username": "root",
        "database_password": null,
        "database_name": "qlip",
        "database_host": "127.0.0.1",
        "database_dialect": "mysql",

        "station_port": 4119,

        "server_url": 'http://qlip.io',
        "server_host": '127.0.0.1',
        "server_port": 2368,
        "session_secret": 'SECRET SESSION',

        "google_client_id": 'xxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com',
        "google_client_secret": 'xxxxxxxxxxxxxxxxxxxxxxx'
    },

    // ### Development **(default)**
    development: {
        "app_title": "Qlip",

        "database_username": "root",
        "database_password": null,
        "database_name": "qlip_dev",
        "database_host": "127.0.0.1",
        "database_dialect": "mysql",

        "station_port": 4119,

        "server_url": 'http://localhost:2368',
        "server_host": '127.0.0.1',
        "server_port": 2368,
        "session_secret": 'SECRET SESSION',

        "google_client_id": 'xxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com',
        "google_client_secret": 'xxxxxxxxxxxxxxxxxxxxxxx'
    }
};

// Export config
module.exports = settings;
