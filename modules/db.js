var exports = {};

var fs = require('fs');

/**
 * Returns the data from db.json
 */
exports.read = function() {
  var data = JSON.parse(fs.readFileSync('../db/db.json', 'utf-8'));
  return data;
};

/**
 * Writes data from db.json
 */
exports.write = function(dbData) {
  fs.writeFileSync('../db/db.json', JSON.stringify(dbData), 'utf-8');
};

exports.remove = function(ip){
  //remove
    var database = exports.read();
    var indexOfIp = indexOf(database, ip);
    database = database.splice(indexOfIp, 1);
    exports.write(database);
};

function indexOf( db, ip){
    var count = 0;
    while(db.length--){
        if (db[count].ip == ip) {
            return count;
        } else{
            count ++;
        }
    }
    return -1;
}
module.exports = exports;
