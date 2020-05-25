import {BaseNode} from "./BaseNode";

export class ReferenceNode extends BaseNode {
  constructor(identifier, referenced) {
    super();
    this.identifier = identifier;
    this.referenced = referenced;
  }

  exec(env) {
    env.setReference(this.identifier, this.referenced);
  }
}
