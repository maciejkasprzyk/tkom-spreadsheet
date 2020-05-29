import {BaseNode} from "./BaseNode";

export class UnaryOperator extends BaseNode {
  constructor(operand, token) {
    super(token);
    this.operand = operand;
  }

  findCellsReferenced(env) {
    return this.operand.findCellsReferenced(env);
  }
}
