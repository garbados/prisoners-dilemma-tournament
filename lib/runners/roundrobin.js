// ensure n remains unknown
var ROUND_LENGTH_VARIANCE = Math.floor(Math.random() * 5) - 5;
var ROUND_LENGTH = 100 + ROUND_LENGTH_VARIANCE;

function zip (list1, list2) {
  return list1.map(function (_, i) {
    return [list1[i], list2[i]];
  });
}

function score (history1, history2) {
  var scores = [0, 0];
  for (var i = 0; i < ROUND_LENGTH; i++) {
    // T T
    if (history1[i] && history2[i]) {
      scores[0]++;
      scores[1]++;
    }
    // F T
    // T F
    else if (history1[i] || history2[i]) {
      if (history1[i]) {
        scores[0] += 3;
      } else {
        scores[1] += 3;
      }
    }
    // F F
    else {
      scores[0] += 2;
      scores[1] += 2;
    }
  }

  return scores;
}

function play (strat1, strat2) {
  var strat1_history = [strat1([])];
  var strat2_history = [strat2([])];

  for (var i = 1; i < ROUND_LENGTH; i++) {
    var strat1_choice = strat1(zip(strat1_history, strat2_history));
    var strat2_choice = strat2(zip(strat2_history, strat1_history));
    strat1_history.push(strat1_choice);
    strat2_history.push(strat2_choice);
  }

  return score(strat1_history, strat2_history);
}

module.exports = function (strategies) {
  var results = {};
  Object.keys(strategies).forEach(function (name, i, names) {
    if (!results[name])
      results[name] = {};

    names.forEach(function (opponent_name) {
      if (!results[opponent_name])
        results[opponent_name] = {};
      
      // skip matches we've already calculated
      if (results[name][opponent_name] !== undefined) return;

      var result = play(strategies[name], strategies[opponent_name]);
      results[name][opponent_name] = result[0];
      results[opponent_name][name] = result[1];
    });
  });

  return results;
};
