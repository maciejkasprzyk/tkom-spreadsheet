import {BaseNode} from "./BaseNode";
import {FunctionIdentifierNode} from "./FunctionIdentifierNode";

export class FunctionDefNode extends BaseNode{
  constructor(identifierToken,args,block) {
    super();
    this.identifier = new FunctionIdentifierNode(identifierToken);
    this.args = args;
    this.block = block;
  }


  exec(env) {
    env.setFunction(this.identifier.value, this.args, this.block);
  }
}



// mozna wywolac funkcje z argumentami pozycyjnymi i wtedy normalnie poszczegolne wartosci sa kopiowane do funkcji
// 1 argument wywolania do 1 argumentu funkcji itp
// (maybe) mozna wywolac funkcje podajac przed argumentem *, wszystkie argument z * sa zbierane do jednego argumentu
// funkcji, ktory tez jest zdefiniowane z * z przodu i mozna po nim iterowac
