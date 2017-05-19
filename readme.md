# Prisoner's Dilemma Tournament

[git]: https://git-scm.com/
[npm]: https://npmjs.com/

[![Build Status](https://travis-ci.org/garbados/prisoners-dilemma-tournament.svg)](https://travis-ci.org/garbados/prisoners-dilemma-tournament)

[Prisoner's Dilemma](http://en.wikipedia.org/wiki/Prisoner%27s_dilemma) tournaments are [really neat](http://lesswrong.com/lw/7f2/prisoners_dilemma_tournament_results/), so I decided to make my own.

## Install

If you want to play around with the tournament code, or develop your own strategies, get the source code using [git][git], and install dependencies with [npm][npm] like so:

    git clone https://github.com/garbados/prisoners-dilemma-tournament.git
    cd prisoners-dilemma-tournament
    npm install
    npm link
    pdt
    > Usage: pdt [options]
    > ...

You can now use the `pdt` executable from your terminal to run tournaments!

## Usage

To run a round-robin tournament:

    pdt roundrobin
    # OR
    pdt rr

To run a generational tournament:

    pdt generational
    # OR
    pdt gen

Use the `-p` flag to include only specific strategies in a tournament:

    pdt rr -p cooperate -p defect

To create your own strategy, you can scaffold one with tests:

    pdt scaffold <name>
    # OR
    pdt new <name>
    # FOR EXAMPLE
    pdt new my-great-strategy
    > Creating strategy file at /{PATH_TO_PROJECT}/prisoners-dilemma-tournament/lib/strategies/my-great-strategy.js
    > Creating strategy test file at /{PATH_TO_PROJECT}/prisoners-dilemma-tournament/test/strategies/my-great-strategy.js

You can then edit those files to customize your strategy's logic and the tests that it undergoes.

Check `pdt -h` for more info about available commands and options.

## Testing

To run the test suite:

    npm test

To run the test suite *and* print test coverage:

    npm run cov

## Concepts

### Strategies

Strategies take a history of the choices made during the round so far, and return their choice for this round: to cooperate (`true`) or defect (`false`).

So, a strategy function that always cooperates looks like this:

```javascript
// lib/strategies/cooperate.js
module.exports = function (history) {
  return true
}
```

The history array passed to strategy functions during each round is an array of arrays. Each contained array represents the choices of one round: yours (`history[n][0]`) and your opponent's (`history[n][1]`). The first array (`history[0]`) is the first turn. At the very start of a match, history will be empty (`[]`), since no choices have been made yet.

```javascript
// example history object
[
  [true, false],    // you cooperated, they defected
  [false, false],   // you both defected
  [true, true],     // you both cooperated
  ...
]
```

To create a new strategy, run `pdt new <name>`. To submit your strategy to the project, fork this repo, commit your changes, and issue a Pull Request. Submissions are welcome! Check out some of the existing strategies in [lib/strategies](https://github.com/garbados/prisoners-dilemma-tournament/tree/master/lib/strategies) for ideas and examples.

N.B.:

- Strategies cannot host state outside of their immediate scope. Many copies of the strategy may operate at once, so modifying variables outside of function scope will have confusing results. Constants are fine.
- Strategies cannot know when the match will end. They can guess!
- There is currently no support for performing async work. Given the number of rounds in a match, and the number of matches in a tournament, even synchronous calls to external resources (like files or databases) make the game prohibitively slow.

### Scoring

After each match, a score is tallied based on the choices each strategy made during each round:

- If you and your opponent cooperate, you each gain 1 point.
- If you both defect, you each gain 2 points.
- If one of you defects and the other cooperates, the cooperator gains 3 points while the defector gains 0.

At the end of the match, the lowest score wins. Scores are also tallied across matches. A strategy that reliably wins matches may not overall have the lowest score.

### Tournaments

There are two tournament types: round-robin, and generational.

A round-robin tournament pits every strategy against every strategy including itself, and then reports each strategy's total score, wins, draws, and losses.

A generational tournament pits multiple copies of participating strategies against each other in successive round-robin tournaments. The strategy with the lowest score after each round-robin gains a copy, while the highest score loses a copy. In this way, the tournament meta evolves over time as strategies replace each other. After the generational tournament concludes, it reports the populations of each successive generation, tallying the number of copies of each strategy in them.

## License

GPL-3.0
