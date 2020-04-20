import {FinalNode} from "./FinalNode";

export class VariableNode extends FinalNode {

  constructor(token) {
    super(token);
    this.identifier = token.value;
  }

  exec(env) {
    return env.getVarByName(this.identifier).value;
  }
}
