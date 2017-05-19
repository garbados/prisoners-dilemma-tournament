/* global describe, it */

var assert = require('assert')
var strategy = require('../../lib/strategies/queen')

const HISTORY = [
  [true, true],
  [false, true],
  [false, true],
  [true, true],
  [true, true],
  [true, true],
  [true, true]
]

const DRONE_HISTORY = [
  [true, false],
  [false, false],
  [false, false],
  [true, false],
  [false, true],
  [false, true],
  [false, true]
]

describe('strategies.queen', function () {
  it('should process histories into choices', function () {
    HISTORY.forEach(function (round, i) {
      // test the strategy against successive subsets of the history
      var historySubset = HISTORY.slice(0, i)
      var choice = strategy(historySubset)
      // assert that it returns a boolean
      assert([true, false].indexOf(choice) > -1)
    })
  })

  it('should detect a drone', function () {
    var historySubset
    var choice
    for (var i = 0; i < DRONE_HISTORY.length; i++) {
      historySubset = DRONE_HISTORY.slice(0, i)
      choice = strategy(historySubset)
      if (i > 0) {
        assert(choice === DRONE_HISTORY[i][0])
      } else {
        assert(choice === true)
      }
    }
  })
})
