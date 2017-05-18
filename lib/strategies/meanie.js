/**
 * Tit-for-tat with a twist:
 * if the opponent cooperates, there is a chance equal to `SPITE`
 * that the strategy will defect anyway, rather than cooperate.
 * A variant on the 'sorry' strategy.
 * @module  lib/strategies/meanie
 */

var titfortat = require('./titfortat')

/**
 * @const
 * @default
 * @type {Number}
 */
const SPITE = 0.2

module.exports = function (history) {
  // cooperate first
  if (history.length === 0) {
    return true
  } else {
    // if opponent cooperated, there is a chance to defect anyway.
    // this will take advantage of cooperative strategies,
    // but invite the wrath of more vengeful ones.
    var opponentsLastMove = history[history.length - 1][1]
    if (opponentsLastMove === true) {
      if (Math.random() <= SPITE) { return false } else { return titfortat(history) }
    }
  }
}
