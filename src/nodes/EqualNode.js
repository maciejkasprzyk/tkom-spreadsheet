import {BinaryOperationNode} from "./BinaryOperationNode";

export class EqualNode extends BinaryOperationNode {
  exec(environ) {
    return this.left.exec(environ) === this.right.exec(environ);
  }
}
