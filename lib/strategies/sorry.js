/**
 * Tit-for-tat with a twist:
 * if the opponent defects, there is a chance equal to `FOREGIVENESS`
 * that the strategy will cooperate anyway, rather than defect.
 * @module lib/strategies/sorry
 */
var titfortat = require('./titfortat')

/**
 * @const
 * @default
 * @type {Number}
 */
const FORGIVENESS = 0.2

module.exports = function (history) {
  // cooperate first
  if (history.length === 0) {
    return true
  } else {
    var opponentsLastMove = history[history.length - 1][1]
    // if opponent defected, there is a chance to cooperate anyway.
    // this will take advantage of cooperative strategies,
    // but invite the wrath of more vengeful ones.
    if ((opponentsLastMove === true) && (Math.random() <= FORGIVENESS)) {
      return true
    } else {
      return titfortat(history)
    }
  }
}
