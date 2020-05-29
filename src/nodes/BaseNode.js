export class BaseNode {
  constructor({value,type,text,offset,line,col}) {
    this.value = value;
    this.type = type;
    this.text = text;
    this.offset  = offset
    this.line = line;
    this.col = col;
  }

  findCellsReferenced(env) {
    return [];
  }

  unParse(env) {
    return this.text;
  }
}
