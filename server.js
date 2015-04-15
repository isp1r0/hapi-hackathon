/**
* Dependencies.
*/

"use strict";


var Hapi = require('hapi');
var constants = require('src/config/constants');

// Create a new server
var server = new Hapi.Server();
// Setup the server with a host and port
server.connection({
    host: constants.application.host, 
    port: constants.application.port
});


var mongoose = require('mongoose');
mongoose.connect(constants.database);
mongoose.connection.on('error', function(err) {
    console.error(err, constants.database); 
    console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
});

// Setup the views engine and folder
server.views({
    engines: {
        html: require('swig')
    },
    path: './server/views'
});

// Export the server to be required elsewhere.
module.exports = server;


var routes = require('./src/routes');

server.register(require('hapi-auth-cookie'), function (err) {

    server.auth.strategy('session', 'cookie', {
        password: 'secret',
        cookie: 'sid-example',
        redirectTo: '/login',
        isSecure: false
    });
});


/*
    Load all plugins and then start the server.
    First: community/npm plugins are loaded
    Second: project specific plugins are loaded
 */
server.register([
    {
        register: require("good"),
        options: {
            opsInterval: 5000,
            reporters: [{
                reporter: require('good-console'),
                args:[{ ops: '0 *', request: '*', log: '*', response: '*', 'error': '*' }]
            }]
        }
    },
    {
        register: require("hapi-assets"),
        options: require('./assets.js')
    },
    {
        register: require("hapi-named-routes")
    },
    {
        register: require("hapi-cache-buster")
    },
    {
        register: require('./server/assets/index.js')
    },
    {
      register: routes.home
    },
    {
        register: routes.user
    },
    {
        register: routes.video
    }
], function () {
    //Start the server
    server.start(function() {
        //Log to the console the host and port info
        console.log('Server started at: ' + server.info.uri);
    });
});
