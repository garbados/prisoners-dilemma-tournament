// attempt to recognize the queen.
// once the queen is found, cooperate.
// if the other player is not the queen, defect.

var titfortat = require('./titfortat');
var QUEEN_PATTERN = [true, false, false, true];

module.exports = function (history) {
  if (history.length < 4)
    return false;
  else {
    var their_opening_moves = history.slice(0, QUEEN_PATTERN.length).map(function (x) { return x[1]; });
    var match = their_opening_moves.map(function (choice, i) {
      return choice === QUEEN_PATTERN[i];
    }).reduce(function (a, b) {
      return a && b;
    });
    if (match)
      return true;
    else
      return false;
  }
};
