var exports = {};

var fs = require('fs');

/**
 * Returns the data from db.json
 */
exports.read = function() {
	var data = JSON.parse(fs.readFileSync('db/db.json', 'utf-8'));
	console.log(data);
	console.log(data.length);
	return data;
};

/**
 * Writes data from db.json
 */
exports.write = function(dbData) {
	fs.writeFileSync('db/db.json', JSON.stringify(dbData), 'utf-8');
};

exports.addBusStop = function(busStop) {
	var database = exports.read();
	var busStopIndex = indexOf(database, busStop.ip);
	
	if(busStopIndex == -1) {
		database.push(busStop);
	} else {
		database[busStopIndex] = busStop;
	}
	
	exports.write(database);
	
	return true;
};

exports.remove = function(ip){
    var database = exports.read();
    var indexOfIp = indexOf(database, ip);
    database = database.splice(indexOfIp, 1);
    exports.write(database);
};

function indexOf(db, ip){
    var count = 0;
    while(count < db.length){
        if (db[count].ip == ip) {
            return count;
        } else{
            count ++;
        }
    }
    return -1;
}

module.exports = exports;
