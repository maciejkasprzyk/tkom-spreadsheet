import {BaseNode} from "./BaseNode";

export class FinalNode extends BaseNode {
  constructor(token) {
    super();
    this.value = token.value;
    this.type = token.type;
    this.text = token.text;
    this.offset  = token.offset
    this.linebreaks = token.linebreaks;
    this.line = token.line;
    this.col = token.col;
  }

  exec() {
    return this.value;
  }

  getErrorLineCol() {
    return [this.col, this.line];
  }
}
