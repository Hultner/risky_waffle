var exports = {};

var db = require('./db');
var legalStatus =['available', 'unavailable', 'inactive'];

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

exports.removeBusStop = function(ip){
	db.removeBusStop(ip);
};

exports.getRandomAvailableBusStop = function(){
	return db.getRandomAvailableBusStop();
};

exports.setStatus = function( uuid, status ){
	if(legalStatus.indexOf(status) != -1){
        db.setStatus(uuid, status);
	}else{
		return -1;
	}
};

module.exports = exports;
