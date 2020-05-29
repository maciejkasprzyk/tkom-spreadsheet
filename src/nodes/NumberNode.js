import {PositionedNode} from "./PositionedNode";

export class NumberNode extends PositionedNode {
  unParse(env) {
    return this.value.toString();
  }

  exec() {
    return this.value;
  }
}
