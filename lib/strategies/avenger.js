var DEFECT_THRESHOLD = 5;

module.exports = function (my_history, their_history) {
  var opponents_last_move = their_history[their_history.length-1];
  var opponents_defects = their_history.filter(function (choice) {
    // return only the turns they defected
    return !choice;
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
