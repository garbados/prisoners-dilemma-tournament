var utils = require('./utils');

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

      var result = utils.play(strategies[name], strategies[opponent_name]);
      results[name][opponent_name] = result[0];
      results[opponent_name][name] = result[1];
    });
  });

  return results;
};
