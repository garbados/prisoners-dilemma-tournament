/* global describe, it */
var assert = require('assert')
var lib = require('../lib')

const TEST_STRATEGIES = ['cooperate', 'defect']

describe('runners', function () {
  describe('round robin', function () {
    it('should play a game', function () {
      var numRounds = 5
      var tournament = new lib.runners.RoundRobin({
        participants: TEST_STRATEGIES,
        numRounds: numRounds
      })
      var result = tournament.run()
      assert(result.participants.length === TEST_STRATEGIES.length)
      assert(result.matches.length === 3)
      assert(result.results.length = TEST_STRATEGIES.length)
      // cooperate loses 3:0 to defect, draws 1:1 to itself
      assert(result.results[0].score === numRounds * 4)
      // defect wins 0:3 to cooperate, draws 2:2 to itself
      assert(result.results[1].score === numRounds * 2)
    })
  })

  describe('generation', function () {
    it('should play a game', function () {
      var numRounds = 5
      var numCopies = 3
      var numGenerations = 5
      var tournament = new lib.runners.Generation({
        participants: TEST_STRATEGIES,
        numRounds: numRounds,
        copies: numCopies,
        generations: numGenerations
      })
      var result = tournament.run()
      // cooperate-v-defect should reach equilibrium in 4 rounds, not 5
      assert(result.generations.length < numGenerations)
    })
  })
})
