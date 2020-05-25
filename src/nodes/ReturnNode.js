import {BaseNode} from "./BaseNode";
import {UserError} from "../parser/errors";

export class ReturnNode extends BaseNode {
  constructor(expr) {
    super();
    this.expr = expr;
  }

  exec() {
    throw new UserError("Return in unexpected place");
  }
}
