/**
 * The classic: tit-for-tat.
 * Cooperates on the first turn, and thereafter
 * copies the opponent's most recent choice.
 * @module  lib/strategies/titfortat
 */

/**
 * Strategy function. Consumes history, returns a choice.
 * @param  {Array} history An array of arrays of each strategy's choice from each round so far,
                           as `[[my_choice, their_choice], ...]`.
 * @return {Boolean}       A boolean representing whether the strategy chooses to cooperate (`true`) or defect (`false`).
 */
module.exports = function (history) {
  if (history.length === 0) {
    return true
  } else {
    var lastTurn = history[history.length - 1]
    var opponentLastMove = lastTurn[1]
    return opponentLastMove
  }
}
