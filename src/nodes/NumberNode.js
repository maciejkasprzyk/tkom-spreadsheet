import {BaseNode} from "./BaseNode";

export class NumberNode extends BaseNode {
  exec() {
    return this.value;
  }
}
