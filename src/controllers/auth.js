"use strict";

var User = require('src/models/user');
var UserService = require('src/services/user');

(function(module){
module.getLogin = function (request, reply) {

    if (request.auth.isAuthenticated) {
        return reply.redirect('/');
    }

    reply.view('account/login', {message: ''});
};

module.postLogin = function (request, reply) {
    if (request.auth.isAuthenticated) {
        return reply.redirect('/');
    }
    

    delete request.payload._csrf;
    User.login(request.payload, function (err, message, user) {
        if (err) {
            return reply(500, err);
        }
        if (message) {
            return reply.view("account/login", {
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


module.facebook = function (request, reply) {
    return reply.redirect(UserService.facebookLoginDialog());
};


module.loginCallback = function (request, reply) {
    if (request.query.error) {
        // user might have disallowed the app
        return reply('login-error ' + request.query.error_description).code(400);
    }
    var code = request.query.code;
    if (!code) {
        // 
        return reply.redirect('/');
    }

    UserService.authFacebook(code).then(function (user) {
        if (!user) {
            throw new Error("cannot save user to mongodb ");
        }
        request.auth.session.set(user);
    })
    .done(function(err) {
        if (err) {
            console.log(err);
            reply().code(500);
        } else {
            reply.redirect('/');
        }        
    });
};

})(module.exports);

