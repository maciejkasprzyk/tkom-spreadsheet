import {BinaryOperationNode} from "./BinaryOperationNode";

export class AdditionNode extends BinaryOperationNode {

  symbol = '+'

  exec(env) {
    return this.left.exec(env) + this.right.exec(env);
  }
}
