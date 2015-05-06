module.exports = function (my_history, their_history) {  
  var opponents_last_move = their_history[their_history.length-1];
  if (opponents_last_move !== undefined)
    return opponents_last_move;
  else
    return true;
};
