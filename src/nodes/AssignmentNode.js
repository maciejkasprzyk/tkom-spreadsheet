import {BinaryOperationNode} from "./BinaryOperationNode";
import {UserError} from "../parser/errors";
import {VariableNode} from "./VariableNode";
import {CellNode} from "./CellNode";
import {NumberNode} from "./NumberNode";
import {BaseNode} from "./BaseNode";
import _ from 'lodash';
import {DynamicCellNode} from "./DynamicCellNode";

export class AssignmentNode extends BinaryOperationNode {

  exec(env) {

    if (this.left instanceof VariableNode) {
      env.setVariable(this.left.value, this.right.exec(env));
    } else if (this.left instanceof CellNode || this.left instanceof DynamicCellNode) {
      let x, y;
      if (this.left instanceof CellNode) {
        x = this.left.x;
        y = this.left.y;
      } else {
        x = this.left.x.exec(env);
        y = this.left.y.exec(env);
        console.log("x:",x," y:",y)
      }

      let ast = _.cloneDeep(this.right);

      // hack wrapper to stay DRY
      const wrapper = {ast: ast};
      replaceVariablesWithConstants(wrapper, env);
      ast = wrapper.ast;
      const formula = "=" + ast.unParse(env);
      env.setCell(x, y, formula);

    } else {
      throw new UserError("Assign not to variable");
    }
  }
}

function replaceVariablesWithConstants(ast, env) {
  for (let property in ast) {
    if (ast.hasOwnProperty(property)) {

      if (ast[property] instanceof VariableNode) {
        const varValue = env.getVarByName(ast[property].identifier).value
        ast[property] = new NumberNode({value: varValue});
      } else if (ast[property] instanceof BaseNode) {
        replaceVariablesWithConstants(ast[property], env);
      }

    }
  }
}

// trudny przypadek
// i = 5
// while i < 10
//    cell[i,0] = i
//    i += 1

// trzeba w ktoryms momencie dynamicznie zmienic drzewo parsowania, ta zeby wezel zmiennej i zostal zamieniony
// na wezel typu stałej, o wartoscie zmiennej i w danym momemencie
// mysle zeby to zrobic w metodzie exec wezla assignment node, przejde po calym ast i podstawie wszystkie wywolania
// zmiennych


// super trudny przypadek
// mnoznik = 5
// def fun(komorka):
//    while mnoznik < 10
//        mnoznik = mnoznik * 2
//    return mnoznik * komorka
// mnoznik = 10
// A1 = fun(A2)
// mnoznik = 15


// czy wgl pozwalac na funkcje korzystajace ze zmiennych globalnych?
// jezeli tak to w tym przypadku w wywolaniu funkcj nie wystarczy przechowywac jej identyfikatora,
// trzeba jakos przechowywac wartosc zmiennych globalnych w momencie rozpoczecia funkcji

// albo (latwiej) nie pozwalac na wykorzystywanie zmiennych globalnych w funkcjach


// nie moge pozwalac na konstrukcje w ktory dynamiczne odwolanie jest po prawej stronie: A1 = cell(A2,A3)
// a w konstrukcjach typu cell(A2,A3) = 5*A1  zostanie wykokonane przypisanie do komorki o wspolrzednych,
// ktore okreslaja A2 oraz A3 w momencie wykonania, pozniejsze zmiany A2 i A3 nie beda mialy wplywy na to przypisanie


// ciekawy przypadek
//
// wpisze do komorki A1 wartosc rowna 5
// wykonam kod:
// zmienna = A1
// A2 = zmienna
//
// wtedy w komorce A2 bede mial wartosc 5

// zwrocmy uwage ze kolejnosc operacji jest tutaj wazna
// jezeli zrobie na odwrot:
//
// wykonam kod:
// zmienna = A1
// A2 = zmienna
// wpisze do komorki A1 wartosc rowna 5
//
// to komorka A2 bedzie miala wartosc pusta


// jak uzyskac formule z drzewa parsowania?
// np uzytkownik wpisuje
//
// zmienna = 5
// A1 = A2 * zmienna
//
// ja teraz chce zeby po kliniecie komorki A1 w arkuszu wyświetlilo sie:  =A2*5
// w momencie wywolania przypisania do komorki:
// 1) przejsc sie po drzewie parsowania i podstawic stale w miejsce odwolan do zmiennych
// 2) w kazdym nodzie uzywanym w formulaGrammar zaimplementowac metode unparse, ktora pozwoli stoworzyc
// stringa na podstawie drzewa parsowania


// czy w kodzie jest jakis odpowiednik wpisania
