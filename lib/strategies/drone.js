/**
 * Attempts to detect the queen by watching for `QUEEN_PATTERN`
 * while defecting. If the opponent is a queen, cooperate forever.
 * Otherwise, defect forever.
 * @module lib/strategies/drone
 */

/**
 * @const
 * @type {Array}
 * @default
 */
const QUEEN_PATTERN = [true, false, false, true]

module.exports = function (history) {
  // defect until certain of the presence of a queen
  if (history.length < QUEEN_PATTERN.length) {
    return false
  } else {
    // detect the queen by determining conformity
    // between the opponent's opening moves
    // and the moves in QUEEN_PATTERN.
    var theirOpeningMoves = history.slice(0, QUEEN_PATTERN.length).map(function (x) { return x[1] })
    var match = theirOpeningMoves.map(function (choice, i) {
      return choice === QUEEN_PATTERN[i]
    }).reduce(function (a, b) {
      return a && b
    })
    if (match) { return true } else { return false }
  }
}
