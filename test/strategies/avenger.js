/* global describe, it */

var assert = require('assert')
var strategy = require('../../lib/strategies/avenger')

const HISTORY = [
  [true, false],
  [false, false],
  [false, false],
  [false, false],
  [false, false],
  [false, true],
  [false, true],
  [false, true]
]

describe('strategies.avenger', function () {
  it('should process histories into choices', function () {
    var historySubset
    var choice
    for (var i = 0; i < HISTORY.length; i++) {
      historySubset = HISTORY.slice(0, i)
      choice = strategy(historySubset)
      assert(choice === HISTORY[i][0])
    }
  })

  // write additional tests as appropriate
})
