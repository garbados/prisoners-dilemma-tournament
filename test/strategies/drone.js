/* global describe, it */

var assert = require('assert')
var strategy = require('../../lib/strategies/drone')

const HISTORY = [
  [false, true],
  [false, true],
  [false, true],
  [false, true],
  [false, true],
  [false, true]
]

const QUEEN_HISTORY = [
  [false, true],
  [false, false],
  [false, false],
  [false, true],
  [true, false],
  [true, false]
]

describe('strategies.drone', function () {
  it('should process histories into choices', function () {
    HISTORY.forEach(function (round, i) {
      // test the strategy against successive subsets of the history
      var historySubset = HISTORY.slice(0, i)
      var choice = strategy(historySubset)
      // assert that it returns a boolean
      assert([true, false].indexOf(choice) > -1)
    })
  })

  it('should detect a queen', function () {
    var historySubset
    var choice
    for (var i = 0; i <= QUEEN_HISTORY.length; i++) {
      historySubset = QUEEN_HISTORY.slice(0, i)
      choice = strategy(historySubset)
      if (i > 0) {
        assert(choice === QUEEN_HISTORY[i - 1][0])
      } else {
        assert(choice === false)
      }
    }
  })
})
