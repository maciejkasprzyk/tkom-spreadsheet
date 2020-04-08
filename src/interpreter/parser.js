import * as nearley from 'nearley';
import grammar from "./grammar.js";
import {UserError} from "./userError";


export class Parser {
  constructor() {
    this.parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  }

  feed(s) {
    try {
      this.parser.feed(s);
    } catch (e) {
      // throw new UserError(e.message.split('\n')[0]);
      throw new UserError("Syntax error");
    }
  }

  get results() {
    try {
      return this.parser.results[0][0];
    }catch (e) {
      return null;
    }
  }
}
