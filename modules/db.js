var exports = {};

var fs = require('fs');

exports.read = function() {
  var data = fs.readFileSync('../db/db.json', 'utf-8');
  return data;
};

exports.write = function(newValue) {
  fs.writeFileSync('../db/db.json', newValue, 'utf-8');
};

module.exports = exports;
