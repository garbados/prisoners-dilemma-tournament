var titfortat = require('./titfortat');
var DEFECT_THRESHOLD = 5;

module.exports = function (history) {
  // count how many times the opponent defected
  var opponents_defects = history.filter(function (choices) {
    // return only the turns they defected
    return !choices[1];
  }).length;
  // defect relentlessly when your patience runs out
  if (opponents_defects > DEFECT_THRESHOLD)
    return false;
  // otherwise, tit-for-tat
  else return titfortat(history);
};
