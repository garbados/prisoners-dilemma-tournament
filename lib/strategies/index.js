// load all the strategies in the folder
var path = require('path');
var fs = require('fs');
var strategies = {};

var strategy_files = fs.readdirSync(__dirname);
strategy_files.forEach(function (filename) {
  if (filename !== 'index.js') {
    var name = filename.slice(0, -3);
    var strategy_path = path.join(__dirname, filename);
    strategies[name] = require(strategy_path);
  }
});

module.exports = strategies;
