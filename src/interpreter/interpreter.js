import {nodeTypes} from "./nodeTypes";

export class Interpreter {
  constructor(ast, getValueByIdent, getValuesByRange, functions) {
    this.ast = ast;
    this.getValueByIdent = getValueByIdent;
    this.getValuesByRange = getValuesByRange;
    this.functions = functions;


    this.cellsReferenced = null;
    this.result = null;
  }


  execute() {
    this.cellsReferenced = [];
    // _execute adds cells to cellsReferenced array
    this.result = this._execute(this.ast);
  }


  _execute(x) {
    // its a primitive
    if (!x.type) {
      return x;
    }

    switch (x.type) {
      case nodeTypes.multiplication:
        return this._execute(x.op1) * this._execute(x.op2);

      case nodeTypes.division:
        return this._execute(x.op1) / this._execute(x.op2);

      case nodeTypes.addition:
        return this._execute(x.op1) + this._execute(x.op2);

      case nodeTypes.subtraction:
        return this._execute(x.op1) - this._execute(x.op2);

      case nodeTypes.functionCall:
        if (!this.functions.hasOwnProperty(x.identifier)) {
          throw Error(`No function ${x.identifier}`);
        }
        let argsList = [];
        if (x.args.type === nodeTypes.list) {
          for (const arg of x.args) {
            argsList.push(this.getValueByIdent(arg))
          }
        } else if (x.args.type === nodeTypes.range) {
          argsList = this.getValuesByRange(x.args.identifier1, x.args.identifier2);
        }
        return this.functions[x.identifier](argsList);

      default:
        throw Error(x);

    }
  }
}

