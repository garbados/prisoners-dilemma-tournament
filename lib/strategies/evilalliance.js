/**
 * Attempts to identify confederates of the evil alliance
 * by defecting five consecutive times. Thereafter, if the
 * opponent cooperated at least once during the first five
 * turns, defect always. Otherwise, cooperate always.
 *
 * Originally by [ArisKatsaris](http://lesswrong.com/user/ArisKatsaris/).
 * @module  lib/strategies/evilalliance
 */

const CONFEDERATE_PATTERN_LENGTH = 5

module.exports = function (history) {
  if (history.length < CONFEDERATE_PATTERN_LENGTH) {
    return false
  } else {
    var isConfederate = !history
      .slice(0, CONFEDERATE_PATTERN_LENGTH)
      .map(function (round) { return round[1] })
      .reduce(function (a, b) {
        // if opponent cooperated even once in the 1st 5 turns,
        // then reducing with OR will return true, else false.
        return a || b
      })
    // check to ensure the confederate cooperated after executing the pattern
    if (history.length === (CONFEDERATE_PATTERN_LENGTH + 1)) {
      isConfederate = (isConfederate && history[CONFEDERATE_PATTERN_LENGTH][1])
    }
    if (isConfederate) {
      return true
    } else {
      return false
    }
  }
}
