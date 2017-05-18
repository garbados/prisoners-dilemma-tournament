/**
 * Identifies itself to drones using `QUEEN_PATTERN`
 * while watching the opponent's moves for `DRONE_PATTERN`.
 * If the queen detects a drone, it will always defect.
 * If the opponent is not a drone, the queen
 * uses the tit-for-tat strategy.
 * @module  lib/strategies/queen
 */

var titfortat = require('./titfortat')

/**
 * @const
 * @type {Array}
 * @default
 */
const QUEEN_PATTERN = [true, false, false, true]

/**
 * A drone will defect until it is certain of the queen's presence.
 * Thus, if an opponent defects for the length of QUEEN_PATTERN
 * and then cooperates, the queen assumes the opponent is a drone.
 * @const
 * @type {Array}
 * @default
 */
const DRONE_PATTERN = QUEEN_PATTERN.map(function () { return false }).concat(true)

module.exports = function (history) {
  // for the length of the QUEEN_PATTERN
  // execute its moves
  if (history.length < QUEEN_PATTERN.length) {
    return QUEEN_PATTERN[history.length]
  } else {
    // detect the drone by determining conformity
    // between the opponent's opening moves
    // and the moves in DRONE_PATTERN
    var theirOpeningMoves = history.slice(0, DRONE_PATTERN.length).map(function (x) { return x[1] })
    var match = theirOpeningMoves.map(function (choice, i) {
      return choice === DRONE_PATTERN[i]
    }).reduce(function (a, b) {
      return a && b
    })
    // if drone, defect. else, tit for tat.
    if (match) {
      return false
    } else return titfortat(history)
  }
}
