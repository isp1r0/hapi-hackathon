// Base routes for default index/root path, about page, 404 error pages, and others..
"use strict";

var users = {
    john: {
        id: 'john',
        password: 'password',
        name: 'John Doe'
    }
};

var home = function (request, reply) {
    reply('<html><head><title>Login page</title></head><body><h3>Welcome '+ request.auth.credentials.name + '!</h3><br/><form method="get" action="/logout">'+ '<input type="submit" value="Logout">'+ '</form></body></html>');
};

var login = function (request, reply) {

    if (request.auth.isAuthenticated) {
        return reply.redirect('/');
    }

    var message = '';
    var account = null;

    if (request.method === 'post') {

        if (!request.payload.username ||
            !request.payload.password) {

            message = 'Missing username or password';
        }
        else {
            account = users[request.payload.username];
            if (!account ||
                account.password !== request.payload.password) {

                message = 'Invalid username or password';
            }
        }
    }

    if (request.method === 'get' ||
        message) {

        return reply('<html><head><title>Login page</title></head><body>'+ (message ? '<h3>' + message + '</h3><br/>' : '') + '<form method="post" action="/login">'+ 'Username: <input type="text" name="username"><br>'+ 'Password: <input type="password" name="password"><br/>'+ '<input type="submit" value="Login"></form></body></html>');
    }

    request.auth.session.set(account);
    return reply.redirect('/');
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
            path: '/logout',
            config: {
                handler: logout,
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