"use strict";

var _ = require('lodash');

exports.capitalize = function(string) {
	var capitalized = string.replace(/^./g, function(char, pos) { return char.toUpperCase(); });
	return capitalized.replace(/\-(.)/g, function(_,char){ return char.toUpperCase(); } );
}