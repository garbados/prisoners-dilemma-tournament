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
  if (history.length > 0) {
    var opponentsLastMove = history[history.length - 1][1]
    // if opponent defected, there is a chance to forgive
    // this will halt zero-sum battles with other titfortat bots
    if (opponentsLastMove === false) {
      if (Math.random() <= FORGIVENESS) { return true } else { return titfortat(history) }
    }
  } else return true
}
