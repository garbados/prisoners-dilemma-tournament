var RoundRobinRunner = require('./roundrobin')

/**
 * Constructor for generational tournaments,
 * which refines a population of strategies over time
 * by adding copies of winning strategies and pruning
 * those that lose.
 * @class
 */
class GenerationRunner extends RoundRobinRunner {
  /**
   * Class constructor. Supported options:
   * - `participants`: an array of strings representing names of participating strategies. Defaults to one instance of each known strategy.
   * - `numRounds`: a number representing the number of rounds in each match of the tournaments. Defaults to 100 +/- 2.
   * - `numGenerations`: a number representing the number of generations that the tournament will last. Defaults to 100.
   * - `numCopies`: a number representing the number of copies of each strategy to include in the initial generation.
   * @param  {Object} opts Options object.
   * @constructor
   */
  constructor (opts) {
    opts = opts || {}
    super(opts)
    this.numGenerations = opts.numGenerations || 100
    this.numCopies = opts.numCopies || 3
    // populate first generation with sufficient copies
    this.currentGeneration = []
    this.participants.forEach((name) => {
      for (var i = 0; i < this.numCopies; i++) {
        this.currentGeneration.push(name)
      }
    })
    // archive the first generation
    this.generations = [this.currentGeneration.slice()]
  }

  /**
   * Returns the number of copies of a strategy
   * in a given generation (the current one, by default).
   * @param  {String} name       The name of a strategy.
   * @param  {Array}  generation The generation of copies to examine.
   * @return {Number}            Number of copies of the strategy in the generation.
   */
  getCopiesInGeneration (name, generation) {
    generation = generation || this.currentGeneration
    return generation.map(function (n) {
      return (n === name) ? 1 : 0
    }).reduce(function (a, b) {
      return a + b
    }, 0)
  }

  /**
   * Reports the highest and lowest scores within a group of matches.
   * @param  {Array} matches An array of matches, as `{ pair, history, score }`
   * @return {Object}        The scores: `{ hi: Number, lo: Number, winner: String, loser: String }`
   */
  scoreHiLo (matches) {
    var scores = {
      hi: 0,
      loser: undefined,
      lo: Infinity,
      winner: undefined
    }

    this.participants.forEach(function (participant) {
      var score = 0
      var count = 0
      matches.forEach(function (match) {
        match.pair.forEach(function (name, i) {
          if (name === participant) {
            count++
            score += match.score[i]
          }
        })
      })
      score = score / count
      if (score > scores.hi) {
        scores.hi = score
        scores.loser = participant
      } else if (score < scores.lo) {
        scores.lo = score
        scores.winner = participant
      }
    })

    return scores
  }

  /**
   * Returns the next generation of the population,
   * by eliminating a member with the lowest score,
   * and adding a copy of a member with the highest score.
   * @param  {Array} generation A list of names of strategies.
   * @param  {Number} hiScore The name of the strategy with the highest score
   * @param  {Number} loScore [description]
   */
  getNextGeneration (generation, scores) {
    var loserIndex = generation.indexOf(scores.loser)
    var winnerIndex = generation.indexOf(scores.winner)
    var winner = generation[winnerIndex]
    var newGeneration = generation.slice()
    // the loser is removed from the new generation
    newGeneration.splice(loserIndex, 1)
    // the winner is given an additional copy
    newGeneration.push(winner)
    return newGeneration
  }

  /**
   * Run round robin matches for each generation.
   * At the end of each set of matches, a winner gets a copy,
   * and a loser leaves the island.
   * @return {Object}              Tournament: `{ participants, generations, matches, results }`
   */
  run () {
    var currentMatches
    var currentScores
    var nextGeneration
    var allMatches = []
    for (var i = 0; i < this.numGenerations; i++) {
      currentMatches = this.playMatches(this.currentGeneration)
      allMatches = allMatches.concat(currentMatches.slice())
      currentScores = this.scoreHiLo(currentMatches)
      if ((currentScores.hi === currentScores.lo) || (currentScores.winner === undefined)) {
        break // exit early if equilibrium occurs
      } else {
        nextGeneration = this.getNextGeneration(this.currentGeneration, currentScores)
        // archive the new generation
        this.generations.push(nextGeneration.slice())
        this.currentGeneration = nextGeneration
      }
    }
    return {
      participants: this.participants,
      generations: this.generations,
      matches: allMatches,
      results: this.formatResults(allMatches)
    }
  }
}

module.exports = GenerationRunner
