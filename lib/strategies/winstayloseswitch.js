/**
 * A strategy that cooperates first, and then
 * repeats the prior turn's move if it matched the opponent's
 * OR if the opponent cooperated, in an effort to reach
 * behavioral consensus.
 */

module.exports = function (history) {
  if (history.length === 0) {
    return true
  } else {
    var lastRound = history[history.length - 1]
    var myChoice = lastRound[0]
    var theirChoice = lastRound[1]
    if ((theirChoice === true) || (theirChoice === myChoice)) {
      return myChoice
    } else {
      return !myChoice
    }
  }
}
