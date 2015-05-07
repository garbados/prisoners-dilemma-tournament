module.exports = function (history) {  
  if (history.length)
    return history.slice(-1)[0][1];
  else
    return true;
};
