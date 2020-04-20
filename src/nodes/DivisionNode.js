import {BinaryOperationNode} from "./BinaryOperationNode";

export class DivisionNode extends BinaryOperationNode {
  exec(env) {
    return this.left.exec(env) / this.right.exec(env);
  }
}
