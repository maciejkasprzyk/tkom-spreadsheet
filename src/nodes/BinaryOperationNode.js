import {BaseNode} from "./BaseNode";

export class BinaryOperationNode extends BaseNode {
  constructor(left,right) {
    super();
    this.left = left;
    this.right = right;
  }

  findVarsReferenced(env) {
    return this.left.findVarsReferenced(env).concat(this.right.findVarsReferenced(env));
  }

}
