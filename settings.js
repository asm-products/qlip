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
        "server_port": 80,
        "session_secret": 'SECRET SESSION',

        "google_client_id": '30874526238-ke8ec2un9mjnp3965qqi1moef0cuddc2.apps.googleusercontent.com',
        "google_client_secret": '_cuHCbNrSxQp5vtoeHKV3TSR'
    },

    // ### Development **(default)**
    development: {
        "app_title": "Qlip",

        "database_username": "root",
        "database_password": "insert00",
        "database_name": "qlip_dev",
        "database_host": "127.0.0.1",
        "database_dialect": "mysql",

        "station_port": 4119,

        "server_url": 'http://localhost:8080',
        "server_host": '127.0.0.1',
        "server_port": 8080,
        "session_secret": 'SECRET SESSION',

        "google_client_id": '30874526238-ke8ec2un9mjnp3965qqi1moef0cuddc2.apps.googleusercontent.com',
        "google_client_secret": '_cuHCbNrSxQp5vtoeHKV3TSR'
    }
};

// Export config
module.exports = settings;
