import {PositionedNode} from "./PositionedNode";

export class VariableNode extends PositionedNode {

  constructor(token) {
    super(token);
    this.identifier = token.value;
  }

  exec(env) {

    const x = env.getReference(this.identifier);
    if (x !== undefined) {
      return x.exec(env)
    }
    return env.getVarByName(this.identifier).value;
  }
}
