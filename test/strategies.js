/* global describe, it */

var assert = require('assert')
var lib = require('../lib')
var strategies = lib.strategies

describe('strategies', function () {
  Object.keys(strategies).forEach(function (name) {
    describe(name, function () {
      it('should, given histories, return a choice', function () {
        var choice = strategies[name]([])
        assert([true, false].indexOf(choice) !== -1)
      })
    })
  })
})
