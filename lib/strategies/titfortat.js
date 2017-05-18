/**
 * The classic: tit-for-tat.
 * Cooperates on the first turn, and thereafter
 * copies their opponent's most recent move.
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
