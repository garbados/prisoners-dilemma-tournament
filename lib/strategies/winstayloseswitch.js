module.exports = function (history) {
  if (history.length === 0)
    return true;

  var last_round = history[history.length-1];
  var my_choice = last_round[0];
  var their_choice = last_round[1];
  if (my_choice === their_choice)
    return my_choice;
  else
    return !my_choice;
};
