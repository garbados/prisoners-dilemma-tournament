var utils = require('./utils');

function sum_results (results) {
  return results.map(function (result, i) {
    return result.reduce(function (a, b) { return a + b; }, 0);
  });
}

function execute_round (strategies) {
  // strategies = [[name, function], ...]
  var results = [];
  strategies.forEach(function (s1, i) {
    if (!results[i]) results[i] = [];

    strategies.forEach(function (s2, j) {
      if (!results[j]) results[j] = [];

      // skip matches we've already calculated
      if (results[i][j]) return;

      var result = utils.play(s1[1], s2[1]);
      results[i][j] = result[0];
      results[j][i] = result[1];
    });
  });

  return results;
}

function natural_selection (strategies, scores) {
  // reproduce the highest
  // kill off the lowest
  var sorted_strategies = strategies.map(function (strategy, i) {
    strategy[2] = scores[i];
    return strategy;
  }).sort(function (a, b) {
    return a[2] - b[2];
  });

  var max_score = sorted_strategies[0][2];
  var min_score = sorted_strategies[sorted_strategies.length-1][2];
  
  var new_generation = [];
  sorted_strategies.forEach(function (strategy) {
    if (strategy[2] === max_score)
      new_generation.push(strategy);
    if (strategy[2] < min_score) {
      new_generation.push(strategy);
    }
  });

  return new_generation;
}

module.exports = function (strategies, num_generations) {
  // format strategies object into an array of arrays
  // so we can have duplicates of strategy names
  var initial_population = Object.keys(strategies).map(function (name) {
    return [name, strategies[name]];
  });
  var generations = [initial_population];

  for (var i = 0; i < num_generations; i++) {
    var current_generation = generations[i];
    var results = execute_round(current_generation);
    var scores = sum_results(results);
    var next_generation = natural_selection(current_generation, scores);
    generations.push(next_generation);
  }
  
  return generations;
};
