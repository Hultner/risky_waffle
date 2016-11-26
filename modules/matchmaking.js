var exports = {};

var db = require('./db');

exports.addBusStop = function(ip, city, responseFunction) {
	var busStop = {'ip': ip, 'location': city, 'status': 'active'};
	var ok = db.addBusStop(busStop);
	
	if(ok) {
		responseFunction(undefined, ip +' @ ' + city + ' added');
	} else {
		responseFunction('Could not add ' + ip);
	}
};

exports.removeBusStop = function(ip, responseFunction) {
	db.removeBusStop();
	responseFunction(undefined, 'Removed '+ip);
};

exports.getAllBusStops = function(responseFunction) {
	responseFunction(undefined, db.getAllBusStops());
};

exports.getLocation = function(ip, responseFunction) {
	var loc = db.getLocationFromIP(ip);
	
	if(loc == undefined) {
		responseFunction('No location for '+ip);
	} else {
		responseFunction(undefined, loc);
	}
};

module.exports = exports;
