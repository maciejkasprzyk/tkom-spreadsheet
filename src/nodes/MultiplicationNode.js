import {BinaryOperationNode} from "./BinaryOperationNode";

export class MultiplicationNode extends BinaryOperationNode {
  exec(env) {
    return this.left.exec(env) * this.right.exec(env);
  }
}
