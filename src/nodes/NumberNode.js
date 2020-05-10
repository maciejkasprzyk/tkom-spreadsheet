import {FinalNode} from "./FinalNode";

export class NumberNode extends FinalNode {
  unParse(env) {
    return this.value.toString();
  }
}
