# Prisoner's Dilemma Tournament

[git]: https://git-scm.com/
[npm]: https://npmjs.com/

[![Build Status](https://travis-ci.org/garbados/prisoners-dilemma-tournament.svg)](https://travis-ci.org/garbados/prisoners-dilemma-tournament)

[Prisoner's Dilemma](http://en.wikipedia.org/wiki/Prisoner%27s_dilemma) tournaments are [really neat](http://lesswrong.com/lw/7f2/prisoners_dilemma_tournament_results/), so I decided to make my own.

## Install

If you want to play around with the tournament code, or fine-tune your own strategies, get the source code using [git][git], and install dependencies with [npm][npm] like so:

    git clone https://github.com/garbados/prisoners-dilemma-tournament.git
    cd prisoners-dilemma-tournament
    npm install

## Usage

To run a round-robin tournament:

    npm run rr

To run a generational tournament across 5 generations:

    npm run gen -- 5

## Testing

To run the tournament's test suite:

    npm test

## Concepts

### Strategies

Strategies are functions that take a list of lists, each containing your move and your opponent's for that round. For example:

```javascript
[
  [true, false],
  [false, false],
  [true, true],
  ...
]
```

Functions must return a boolean value indicating whether they want to cooperate this turn (`true`), or defect (`false`). For example:

```javascript
// titfortat.js
module.exports = function (history) {
  if (history.length) {
    var last_round = history[history.length-1];
    var opponent_last_move = last_round[1];
    return opponent_last_move;
  } else return true;
};
```

Returning a `true` value indicates your strategy will cooperate this turn. Returning `false` indicates it will defect.

To add a strategy, add a file to `lib/strategies/` that exports a function. The loader will detect the strategy automatically, and include it in future tournaments. The testing suite, likewise, will attempt to ensure all included strategies won't break or time out during a tournament.

If your strategy needs to do async work, uh, just don't.

### Tournaments

There are two tournament types: round-robin, and generational.

A round-robin tournament pits every strategy against every other strategy, and then reports each strategy's 'score' in terms of years spent in AI prison. The lowest score wins.

A generational tournament starts with a round-robin tournament, but uses the results to kill off ineffective strategies, and reproduce effective ones, before running another round-robin tournament. After a given number of generations, the tournament will report the results of each, describing populations of strategies over time.

## License

GPL-3.0
