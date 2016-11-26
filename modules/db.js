var exports = {};

var fs = require('fs');

/**
 * Returns the data from db.json
 */
exports.read = function() {
  var data = fs.readFileSync('../db/db.json', 'utf-8');
  return data;
};

/**
 * Writes data from db.json
 */
exports.write = function(dbData) {
  fs.writeFileSync('../db/db.json', dbData, 'utf-8');
};

module.exports = exports;
