module.exports = function (history) {
  if (history.length) {
    var last_round = history[history.length-1];
    var opponent_last_move = last_round[1]; 
    return opponent_last_move;
  } else return true;
};
