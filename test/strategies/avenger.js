/* global describe, it */

var assert = require('assert')
var strategy = require('../../lib/strategies/avenger')

const HISTORY = [
  [true, false],
  [false, true],
  [true, true]
]

describe('strategies.avenger', function () {
  it('should process histories into choices', function () {
    HISTORY.forEach(function (round, i) {
      // test the strategy against successive subsets of the history
      var historySubset = HISTORY.slice(0, i)
      var choice = strategy(historySubset)
      // assert that it returns a boolean
      assert([true, false].indexOf(choice) > -1)
    })
  })

  // write additional tests as appropriate
})
