var exports = {};

var db = require('./db');
var legalStatus =['available', 'unavailable', 'inactive'];

exports.addBusStop = function(uuid, city, sdp, data, responseFunction) {
	if(uuid == undefined || city == undefined || sdp == undefined) {
		responseFunction('Missing data');
	} else {
		var busStop = {'uuid': uuid, 'location': city, 'sdp': sdp, 'status': 'available', 'data': data};
		var ok = db.addBusStop(busStop);
		
		if(ok) {
			responseFunction(undefined, busStop);
		} else {
			responseFunction('Could not add ' + uuid);
		}
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

exports.getRandomAvailableBusStop = function(responseFunction){
	busStop = db.getRandomAvailableBusStop();
	if (busStop != undefined){
        db.setStatus(busStop.uuid, 'unavailable');
        responseFunction(undefined, busStop);
	}else{
		responseFunction(undefined, {});
	}
};

exports.setStatus = function( uuid, status, responseFunction ){
	if(legalStatus.indexOf(status) != -1){
        db.setStatus(uuid, status);
        responseFunction(undefined, status);
	}else{
		responseFunction('not a legal status');
	}
};

module.exports = exports;
