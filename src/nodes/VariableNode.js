import {BaseNode} from "./BaseNode";
import {errorInfoExecDecorator} from "../utils";

export class VariableNode extends BaseNode {

  constructor(identifier, token) {
    super(token);
    this.identifier = identifier;
  }

  @errorInfoExecDecorator
  exec(env) {
    const x = env.getReference(this.identifier);
    if (x !== undefined) {
      return x.exec(env)
    }
    return env.getVarByName(this.identifier).value;
  }
}
