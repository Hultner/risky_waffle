var exports = {};

var db = require('./db');

exports.addBusStop = function(uuid, city, responseFunction) {
	var busStop = {'uuid': uuid, 'location': city, 'status': 'available'};
	var ok = db.addBusStop(busStop);
	
	if(ok) {
		responseFunction(undefined, uuid +' @ ' + city + ' added');
	} else {
		responseFunction('Could not add ' + uuid);
	}
};

exports.removeBusStop = function(uuid, responseFunction) {
	db.removeBusStop();
	responseFunction(undefined, 'Removed '+uuid);
};

exports.getAllBusStops = function(responseFunction) {
	responseFunction(undefined, db.getAllBusStops());
};

exports.getLocation = function(uuid, responseFunction) {
	var loc = db.getLocation(uuid);
	
	if(loc == undefined) {
		responseFunction('No location for '+uuid);
	} else {
		responseFunction(undefined, loc);
	}
};

module.exports = exports;
