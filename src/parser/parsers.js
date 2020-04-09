import * as nearley from 'nearley';
import grammar from "./grammar.js";
import formulaGrammar from "./formulaGrammar.js";

import {UserError} from "./errors";

export class Parser {
  constructor() {
    this.parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  }

  feed(s) {
    try {
      this.parser.feed(s);
    } catch (e) {
      throw new UserError(e.message);
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


export class FormulaParser {
  constructor() {
    this.parser = new nearley.Parser(nearley.Grammar.fromCompiled(formulaGrammar));
  }

  feed(s) {
    try {
      this.parser.feed(s);
    } catch (e) {
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
