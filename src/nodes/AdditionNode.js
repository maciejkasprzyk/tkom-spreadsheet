import {BinaryOperationNode} from "./BinaryOperationNode";

export class AdditionNode extends BinaryOperationNode {
  exec(env) {
    return this.left.exec(env) + this.right.exec(env);
  }
}
