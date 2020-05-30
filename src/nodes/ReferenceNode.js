import {BaseNode} from "./BaseNode";

export class ReferenceNode extends BaseNode {
  constructor(identifier, referenced, token) {
    super(token);
    this.identifier = identifier;
    this.referenced = referenced;
    console.log(identifier,referenced)
  }

  exec(env) {
    env.setReference(this.identifier, this.referenced);
  }
}
