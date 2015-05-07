// identifies itself to drones
// then exploits them.
// if the other player is not a drone
// tit-for-tat

var titfortat = require('./titfortat');
var QUEEN_PATTERN = [true, false, false, true];
var DRONE_PATTERN = [false, false, false, false, true];

module.exports = function (history) {
  if (history.length < QUEEN_PATTERN.length) {
    return QUEEN_PATTERN[history.length];
  } else {
    var their_opening_moves = history.slice(0, DRONE_PATTERN.length).map(function (x) { return x[1]; });
    var match = their_opening_moves.map(function (choice, i) {
      return choice === DRONE_PATTERN[i];
    }).reduce(function (a, b) {
      return a && b;
    });
    if (match) {
      return false;
    } else return titfortat(history);
  }
}