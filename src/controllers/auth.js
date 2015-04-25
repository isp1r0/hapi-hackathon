"use strict";

var User = require('src/models/user');

(function(module){
module.getLogin = function (request, reply) {

    if (request.auth.isAuthenticated) {
        return reply.redirect('/');
    }

    reply.view('login', {message: ''});
};

module.postLogin = function (request, reply) {
    if (request.auth.isAuthenticated) {
        return reply.redirect('/');
    }

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
};

module.logout = function (request, reply) {

    request.auth.session.clear();
    return reply.redirect('/');
}; 

})(module.exports);

