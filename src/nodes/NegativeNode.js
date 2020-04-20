import {UnaryOperator} from "./UnaryOperator";

export class NegativeNode extends UnaryOperator {
  exec(env) {
    return -this.operand.exec(env);
  }
}
