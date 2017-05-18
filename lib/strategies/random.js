/**
 * Semi-randomly cooperate and defect,
 * using `Math.random()`.
 * @module lib/strategies/random
 */

module.exports = function () {
  return (Math.random() < 0.5)
}
