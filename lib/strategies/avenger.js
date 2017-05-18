/**
 * Tit-for-tat with a twist:
 * once the opponent has defected more than
 * `DEFECT_THRESHOLD` the strategy opts to defect
 * forevermore. No apologies!
 *
 * Originally by [Eugine_Nier](http://lesswrong.com/user/Eugine_Nier/).
 * @module lib/strategies/avenger
 */

var titfortat = require('./titfortat')

/**
 * @const
 * @type {Number}
 * @default
 */
const DEFECT_THRESHOLD = 5

/**
 * Strategy function. Consumes history, returns a choice.
 * @param  {Array} history An array of arrays of each strategy's choice from each round so far,
                           as `[[my_choice, their_choice], ...]`.
 * @return {Boolean}       A boolean representing whether the strategy chooses to cooperate (`true`) or defect (`false`).
 */
module.exports = function (history) {
  // count how many times the opponent defected
  var opponentsDefects = history.filter(function (choices) {
    // return only the turns they defected
    return !choices[1]
  }).length
  // defect relentlessly when your patience runs out
  if (opponentsDefects > DEFECT_THRESHOLD) {
    return false
  } else return titfortat(history)
}
