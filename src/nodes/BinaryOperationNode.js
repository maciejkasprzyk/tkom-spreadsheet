import {BaseNode} from "./BaseNode";

export class BinaryOperationNode extends BaseNode {
  constructor(left,right) {
    super();
    this.left = left;
    this.right = right;
  }

  findCellsReferenced(env) {
    return this.left.findCellsReferenced(env).concat(this.right.findCellsReferenced(env));
  }

  unParse(env) {
    return '( ' + this.left.unParse(env) + " " +  this.symbol + " " + this.right.unParse(env) + ' )';
  }

}
