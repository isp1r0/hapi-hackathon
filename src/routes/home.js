// Base routes for default index/root path, about page, 404 error pages, and others..
"use strict";

var User = require('src/dao/user');
var FB   = require('fb');
var config = require('src/config/facebook');

FB.options({
    appId:          config.facebook.appId,
    appSecret:      config.facebook.appSecret,
    redirectUri:    config.facebook.redirectUri
});

var login = function (request, reply) {

    if (request.auth.isAuthenticated) {
        return reply.redirect('/');
    }

    return reply.redirect(FB.getLoginUrl({ scope: 'user_about_me' }));

    /*if (request.method === 'post') {
        User.login(request.payload, function (err, message, user) {
            if (err) {
                return reply(500, err);
            }
            if (message) {
                return reply.view("login", {
                    message: message
                });
            }
            request.auth.session.set(user);
            reply.redirect('/');
        });
    } else {
        reply.view('login', {message: ''});
    }*/
};

var loginCallback = function (request, reply) {
    if (request.query.error) {
        // user might have disallowed the app
        return reply('login-error ' + request.query.error_description).code(400);
    }
    var code = request.query.code;
    if (!code) {
        // 
        return reply.redirect('/');
    }
    
    FB.napi('oauth/access_token', {
        client_id:      FB.options('appId'),
        client_secret:  FB.options('appSecret'),
        redirect_uri:   FB.options('redirectUri'),
        code:           code
    }, function (err, result) {
        if(err) {
            console.log(err);
            return reply('unable to get token ' + err).code(400);
        }

        var access_token = result.access_token;

        FB.napi('/me', {access_token: access_token} , function (err, result) {
            if(err) {
                console.log(err);
                return reply('error verify ' + err).code(400);
            }
            // name, id
            var newUser = User({
                username: result.name,
                facebook: {
                    name: result.name,
                    id: result.id,
                    access_token: access_token
                }
            });

            newUser.save(function (err, user) {
                if (err) {
                    console.log(err);
                    return reply('error save user').code(500);
                }
                request.auth.session.set(user);
                return reply.redirect('/');
            });            
        });
    });
};

var logout = function (request, reply) {

    request.auth.session.clear();
    return reply.redirect('/');
};

exports.register = function(server, options, next){

    server.route([
        {
            method: 'GET',
            path: '/about',
            config: {
                handler: function(request, reply){
                    reply.view('about', {
                        title: 'Super Informative About Page'
                    });
                },
                id: 'about'
            }
        },
        {
            method: 'GET',
            path: '/',
            config: {
                handler: function(request, reply) {
                    // Render the view with the custom greeting
                    reply.view('index', {
                        title: 'Awesome Boilerplate Homepage'
                    });
                },
                id: 'index',
                auth: 'session'
            }
        },
        {
            method: ['GET', 'POST'],
            path: '/login',
            config: {
                handler: login,
                auth: {
                    mode: 'try',
                    strategy: 'session'
                },
                plugins: {
                    'hapi-auth-cookie': {
                        redirectTo: false
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/login/callback',
            config: {
                handler: loginCallback,
                auth: {
                    mode: 'try',
                    strategy: 'session'
                },
                plugins: {
                    'hapi-auth-cookie': {
                        redirectTo: false
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/logout',
            config: {
                handler: function (request, reply) {
                    request.auth.session.clear(); 
                    return reply.redirect('/');
                },
                auth: 'session'
            }
        },
        {
            method: 'GET',
            path: '/{path*}',
            config: {
                handler: function(request, reply){
                    reply.view('404', {
                        title: 'Total Bummer 404 Page'
                    }).code(404);
                },
                id: '404'
            }
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'base'
};