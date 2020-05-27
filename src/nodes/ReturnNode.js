import {BaseNode} from "./BaseNode";
import {returnHandler} from "../parser/errors";

export class ReturnNode extends BaseNode {
  constructor(expr) {
    super();
    this.expr = expr;
  }

  exec(env) {
    throw new returnHandler(this.expr.exec(env));
  }
}
