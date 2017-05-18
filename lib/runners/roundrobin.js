var BaseRunner = require('./base')

/**
 * @class Runner for round robin tournaments.
 */
class RoundRobinRunner extends BaseRunner {
  /**
   * Get match pairings.
   * Each participant gets one match against each participant (including itself).
   * @param {Array} participants A list of names of participating strategies.
   * @return {Array} An array of arrays of the pairings for each match in the tournament.
   */
  pairings (participants) {
    // remove each participant from the pool
    // once its pairings have been assigned
    var strategyPool = participants.slice()
    var pairs = []

    participants.forEach(function (name1) {
      strategyPool.forEach(function (name2) {
        pairs.push([name1, name2])
      })
      // having computed all its pairings,
      // remove the participant from the pool
      var i = strategyPool.indexOf(name1)
      strategyPool.splice(i, 1)
    })

    return pairs
  }
}

module.exports = RoundRobinRunner
