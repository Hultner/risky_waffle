var exports = {};

var db = require('./db');

exports.addBusStop = function(ip, city, responseFunction) {
	responseFunction(undefined, ip +' @ ' + city + ' added');
};

module.exports = exports;
