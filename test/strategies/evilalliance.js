/* global describe, it */

var assert = require('assert')
var strategy = require('../../lib/strategies/evilalliance')

const HISTORY = [
  [false, false],
  [false, true],
  [true, false],
  [false, true]
]

const CONFEDERATE_HISTORY = [
  [false, false],
  [false, false],
  [false, false],
  [false, false],
  [false, false],
  [true, true],
  [true, true]
]

const DEFECT_HISTORY = [
  [false, false],
  [false, false],
  [false, false],
  [false, false],
  [false, false],
  [true, false],
  [false, false]
]

describe('strategies.evilalliance', function () {
  it('should process histories into choices', function () {
    HISTORY.forEach(function (round, i) {
      // test the strategy against successive subsets of the history
      var historySubset = HISTORY.slice(0, i)
      var choice = strategy(historySubset)
      // assert that it returns a boolean
      assert([true, false].indexOf(choice) > -1)
    })
  })

  it('should detect confederates', function () {
    CONFEDERATE_HISTORY.forEach(function (round, i) {
      // test the strategy against successive subsets of the history
      var historySubset = CONFEDERATE_HISTORY.slice(0, i)
      var choice = strategy(historySubset)
      if (i < 5) {
        assert(choice === false)
      } else {
        assert(choice === true)
      }
    })
  })

  it('should realize a confederate is not as they appear', function () {
    DEFECT_HISTORY.forEach(function (round, i) {
      // test the strategy against successive subsets of the history
      var historySubset = DEFECT_HISTORY.slice(0, i)
      var choice = strategy(historySubset)
      if (i === 5) {
        assert(choice === true)   // buddy thinks other buddy is a buddy
      } else {
        assert(choice === false)  // but it's a lie
      }
    })
  })
})
