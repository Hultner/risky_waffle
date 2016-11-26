var exports = {};

var fs = require('fs');

/**
 * Returns the data from db.json
 */
function read() {
	var data = JSON.parse(fs.readFileSync('db/db.json', 'utf-8'));
	return data;
};

/**
 * Writes data from db.json
 */
function write(dbData) {
	fs.writeFileSync('db/db.json', JSON.stringify(dbData), 'utf-8');
};

/*
 * Get "id" of busStop based on uuid.
 */
function indexOf(db, uuid){
    var count = 0;
    while(count < db.length){
        if (db[count].uuid == uuid) {
            return count;
        } else{
            count ++;
        }
    }
    return -1;
}


exports.addBusStop = function(busStop) {
	var database = read();
	var busStopIndex = indexOf(database, busStop.uuid);
	
	if(busStopIndex == -1) {
		database.push(busStop);
	} else {
		database[busStopIndex] = busStop;
	}
	
	write(database);
	
	return true;
};

exports.removeBusStop = function(uuid) {
    var database = read();
    var indexOfuuid = indexOf(database, uuid);
    database.splice(indexOfuuid, 1);
    write(database);
};

exports.getLocation = function(uuid) {
	var database = read();
	var index = indexOf(database, uuid);
	
	if(index == -1) {
		return undefined;
	} else {
		return database[index].location;
	}
};

exports.getAllBusStops = function() {
	return read();
}

module.exports = exports;
