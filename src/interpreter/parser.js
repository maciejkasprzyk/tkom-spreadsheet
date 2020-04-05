import * as nearley from 'nearley';
import grammar from "./grammar.js";


export class Parser {
  constructor() {
    this.parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  }

  feed(s) {
    return this.parser.feed(s);
  }

  get results() {
    return this.parser.results[0][0];
  }
}
