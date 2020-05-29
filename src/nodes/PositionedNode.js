import {BaseNode} from "./BaseNode";

export class PositionedNode extends BaseNode {
  constructor({value,type,text,offset,line,col}) {
    super();
    this.value = value;
    this.type = type;
    this.text = text;
    this.offset  = offset
    this.line = line;
    this.col = col;
  }

  unParse(env) {
    return this.text;
  }
}
