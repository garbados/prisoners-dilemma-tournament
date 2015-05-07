var titfortat = require('./titfortat');

var FORGIVENESS = 0.2;

module.exports = function (history) {
  if (history.length > 0) {
    var opponents_last_move = history[history.length-1][1];
    // if opponent defected, there is a chance to forgive
    // this will halt zero-sum battles with other titfortat bots
    if (opponents_last_move === false) {
      if (Math.random() <= FORGIVENESS)
        return true;
      else
        return titfortat(history);
    }
  } else return true;
};
