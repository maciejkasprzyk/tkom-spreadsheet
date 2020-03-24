const nearley = require("nearley");
const grammar = require("./grammar.js");
const post = require('./parserPostProcessors');


class Parser {
  cellsReferenced = [];
  constructor(getByLabel) {
    this.parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    // to understand it read comment in parserPostProcessors.js
    post.getByLabel = (label) => {
      const cell = getByLabel(label);
      this.cellsReferenced.push(cell);
      return cell.value;
    };

    const debug = true;
    post.log = debug ? (function () {
      console.log(...arguments)
    }) : () => {};
  }

  feed(s) {
    return this.parser.feed(s);
  }

  get results() {
    return this.parser.results;
  }
}

module.exports.Parser = Parser;
