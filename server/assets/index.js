"use strict";

var bower_components =
{
    js: [        
        "jquery/dist/jquery.js",
        "bootstrap/dist/js/bootstrap.js",
    ],
    css: [
        "bootstrap/dist/css/bootstrap.css",
        "bootstrap-social/bootstrap-social.css",
        "font-awesome/css/font-awesome.css"
    ]
};

function getBowerComponentLink(file) {
    return 'bower_components/' + file;
}

function getDevelopment() {
    var js = [];
    var css = [
        'css/main.css',
        'css/themes/default.css'
    ];

    js = js.concat(bower_components.js.map(getBowerComponentLink));
    css = css.concat(bower_components.css.map(getBowerComponentLink));

    var development = {
        js: js,
        css: css
    };
    return development;
}

function getProduction() {
    var production = {
        js: ['js/scripts.js'],
        css: ['css/styles.css']
    };
    return production;
}


module.exports = {
    development: getDevelopment(),
    production: getProduction()
};