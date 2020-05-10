export class BaseNode {

  findCellsReferenced(env) {
    return [];
  }

  unParse(env) {
    throw Error(`Not implemented ${this.constructor.name}.unParse.`)
  }

}
