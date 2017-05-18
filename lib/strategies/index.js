/**
 * Strategy loader. Loads all strategies in the `lib/strategies` folder
 * by attempting to `require()` every file not included in
 * the constant `IGNORED_FILENAMES`.
*  @module  lib/strategies
 */

var path = require('path')
var fs = require('fs')

/**
 * @constant
 * @type {Array}
 * @default
 */
const IGNORED_FILENAMES = ['index.js']

var strategies = {}

var strategyFiles = fs.readdirSync(__dirname)
strategyFiles.forEach(function (filename) {
  if (IGNORED_FILENAMES.indexOf(filename) === -1) {
    var name = filename.slice(0, -3)
    var strategyPath = path.join(__dirname, filename)
    strategies[name] = require(strategyPath)
  }
})

module.exports = strategies
