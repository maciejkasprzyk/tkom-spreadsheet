import {BaseNode} from "./BaseNode";

export class ListNode extends BaseNode {
  constructor(list) {
    super();
    this.list = list;
  }

  exec(env) {
    for (const node of this.list) {
      console.log(node)
      node.exec(env);
    }
  }
}
