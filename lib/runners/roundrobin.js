var utils = require('./utils');
var GroupStage = require('groupstage');

module.exports = function (strategies) {
  var strategies_list = Object.keys(strategies).map(function (name) {
    return {
      name: name,
      func: strategies[name]
    };
  });

  var gs = new GroupStage(strategies_list.length);
  gs.matches.forEach(function (match, i) {
    var strat1 = strategies_list[match.p[0]-1].func;
    var strat2 = strategies_list[match.p[1]-1].func;
    var result = utils.play(strat1, strat2);
    gs.score(match.id, result.map(function (x) { return -x; }));
  });
  gs.isDone();

  return {
    players: strategies_list,
    matches: gs.matches,
    results: gs.results()
  };
};
