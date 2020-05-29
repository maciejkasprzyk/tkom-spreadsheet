import {BaseNode} from "./BaseNode";
import {returnHandler} from "../parser/errors";

export class ReturnNode extends BaseNode {
  constructor(expr, token) {
    super(token);
    this.expr = expr
  }

  exec(env) {
    throw new returnHandler(this.expr.exec(env));
  }
}
