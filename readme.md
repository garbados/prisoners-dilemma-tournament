# Prisoner's Dilemma Tournament

[Prisoner's Dilemma](http://en.wikipedia.org/wiki/Prisoner%27s_dilemma) tournies are [really neat](http://lesswrong.com/lw/7f2/prisoners_dilemma_tournament_results/), so I decided to make my own.

Feel free to contribute your own strategies!

## Concepts

### Strategies

Strategies are functions that take two lists -- your moves so far, and your opponent's -- and return a boolean value indicating whether they want to cooperate this turn (`true`), or defect (`false`). For example:

```javascript
// titfortat.js
module.exports = function (my_history, their_history) {  
  var opponents_last_move = their_history[their_history.length-1];
  if (opponents_last_move !== undefined)
    return opponents_last_move;
  else
    return true;
}
```

Returning a `true` value indicates your strategy will cooperate this turn. Returning `false` indicates it will defect.

To add a strategy, add a file to `lib/strategies/` that exports a function. The loader will detect the strategy automatically, and include it in future tournaments. The testing suite, likewise, will attempt to ensure all included strategies won't break or time out during a tournament.

If your strategy needs to do async work, uh, just don't.

### Tournaments

There are two tournament types: round-robin, and generational.

A round-robin tournament pits every strategy against every other strategy, and then reports the matrix of results.

A generational tournament starts with a round-robin tournament, but uses the results to kill off ineffective strategies, and reproduce effective ones, before running another round-robin tournament. After a given number of generations, the tournament will report the results of each, describing populations of strategies over time.

## Usage

To run a round-robin tournament:

    ./bin/play roundrobin

To run a generational tournament across 5 generations:

    ./bin/play generation 5

## Testing

Get the project's source code, and then:

    npm install
    npm test

## License

[ISC](http://opensource.org/licenses/ISC), yo.
