import {BinaryOperationNode} from "./BinaryOperationNode";

export class GreaterNode extends BinaryOperationNode {
  exec(env) {
    return this.left.exec(env) > this.right.exec(env);
  }
}
