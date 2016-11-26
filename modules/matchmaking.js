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

module.exports = exports;
