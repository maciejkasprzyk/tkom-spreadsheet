import {BaseNode} from "./BaseNode";

export class UnaryOperator extends BaseNode {
  constructor(operand) {
    super();
    this.operand = operand;
  }

  findVarsReferenced(env) {
    return this.operand.findVarsReferenced(env);
  }
}
