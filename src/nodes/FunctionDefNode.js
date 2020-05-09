import {BaseNode} from "./BaseNode";
import {FunctionIdentifierNode} from "./FunctionIdentifierNode";

export class FunctionDefNode extends BaseNode{
  constructor(identifierToken,args,block) {
    super();
    this.identifier = new FunctionIdentifierNode(identifierToken);
    this.args = args;
    this.block = block;
  }
}
