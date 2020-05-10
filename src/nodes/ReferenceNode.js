import {BaseNode} from "./BaseNode";

export class ReferenceNode extends BaseNode {
  constructor(identifier, referenced) {
    super();
    this.identifier = identifier;
    this.referenced = referenced;
  }
}
