import {BaseNode} from "./BaseNode";

export class UnaryOperator extends BaseNode {
  constructor(operand) {
    super();
    this.operand = operand;
  }

  findCellsReferenced(env) {
    return this.operand.findCellsReferenced(env);
  }
}
