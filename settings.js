var path = require('path'),
    settings;

settings = {
    // ### Production environment
    production: {
        database: {
            "username": "root",
            "password": null,
            "name": "qlip",
            "host": "127.0.0.1",
            "dialect": "mysql"
        },
        station: {
            port: '4119'
        },
        server: {
            url: 'http://qlip.io',
            // Host to be passed to node's `net.Server#listen()`
            host: '127.0.0.1',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: '2368',
            session_secret: 'SECRET SESSION'
        },
        thirdparty: {
            google: {
                GOOGLE_CLIENT_ID: '30874526238-ke8ec2un9mjnp3965qqi1moef0cuddc2.apps.googleusercontent.com',
                GOOGLE_CLIENT_SECRET: '_cuHCbNrSxQp5vtoeHKV3TSR'
            }
        }
    },

    // ### Development **(default)**
    development: {
        database: {
            "username": "root",
            "password": "insert00",
            "name": "qlip_dev",
            "host": "127.0.0.1",
            "dialect": "mysql"
        },
        station: {
            port: '27451'
        },
        server: {
            url: 'http://localhost:2368',
            // Host to be passed to node's `net.Server#listen()`
            host: '127.0.0.1',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: '2368',
            session_secret: 'SECRET SESSION'
        },
        thirdparty: {
            google: {
                GOOGLE_CLIENT_ID: '30874526238-ke8ec2un9mjnp3965qqi1moef0cuddc2.apps.googleusercontent.com',
                GOOGLE_CLIENT_SECRET: '_cuHCbNrSxQp5vtoeHKV3TSR'
            }
        }
    }
};

// Export config
module.exports = settings;
