var DEFECT_THRESHOLD = 5;

module.exports = function (history) {
  // be nice first
  if (!history.length)
    return true;

  var opponents_last_move = history[history.length-1][1];
  var opponents_defects = history.filter(function (choices) {
    // return only the turns they defected
    return !choices[1];
  }).length;
  // defect relentlessly when your patience runs out
  if (opponents_defects > DEFECT_THRESHOLD)
    return false;
  // otherwise, tit-for-tat
  else if (opponents_last_move !== undefined)
    return opponents_last_move;
  // other otherwise, just be nice
  else
    return true;
};
