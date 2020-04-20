import {BinaryOperationNode} from "./BinaryOperationNode";

export class GreaterEqualNode extends BinaryOperationNode {
  exec(env) {
    return this.left.exec(env) >= this.right.exec(env);
  }
}
