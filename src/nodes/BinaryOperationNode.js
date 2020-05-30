import {BaseNode} from "./BaseNode";

export class BinaryOperationNode extends BaseNode {
  constructor(left,right, token) {
    super(token);
    this.left = left;
    this.right = right;
  }


  unParse(env) {
    return '( ' + this.left.unParse(env) + " " +  this.text + " " + this.right.unParse(env) + ' )';
  }

}
