import {BinaryOperationNode} from "./BinaryOperationNode";
import {UserError} from "../parser/errors";
import {VariableNode} from "./VariableNode";
import {CellNode} from "./CellNode";
import {NumberNode} from "./NumberNode";
import {BaseNode} from "./BaseNode";
import _ from 'lodash';
import {DynamicCellNode} from "./DynamicCellNode";
import {errorInfoExecDecorator} from "../utils";

export class AssignmentNode extends BinaryOperationNode {

  @errorInfoExecDecorator
  exec(env) {

    let left = this.left
    // check if this left is an reference
    if (left instanceof VariableNode) {
      // if reference get referenced value
      const x = env.getReference(left.identifier);
      if (x !== undefined) {
        left = x
      }
    }
    if (left instanceof VariableNode) {
      env.setVariable(left.value, this.right.exec(env));
    } else if (left instanceof CellNode || left instanceof DynamicCellNode) {
      let x, y;
      if (left instanceof CellNode) {
        x = left.x;
        y = left.y;
      } else {
        x = left.x.exec(env);
        y = left.y.exec(env);
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

        const x = env.getReference(ast[property].identifier);
        if (x !== undefined) {
          ast[property] = x;
        }
      }

      if (ast[property] instanceof VariableNode) {
        const varValue = ast[property].exec(env);
        ast[property] = new NumberNode({value: varValue, text:varValue.toString()});
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


// w konstrukcjach typu cell(A2,A3) = 5*A1  zostanie wykokonane przypisanie do komorki o wspolrzednych,
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


// jeszcze zastanówmy się nad zapisywanie
// problematyczne będzie zapisaywanie komorek w postaci kodu ponieważ w komorkach mozna wpisywać wartosc
// poprzez value a nie poprzez formule. najlatiwej bedzie jezeli arkusz po prostu zapisze oddzielnie
// w prostej postaci tablic/obiektow JSON i tyle
// nie bede musial wtedy implementowac przypisaywanie do value w kodzie


// musze sie jeszce zastanowic nad wywylywaniem funkcji -> jak przekazywac argumenty a wszczegolnoscio
// jak rozwiazac problem przekzywania do funkcji rangów? czy pozwalać na zmienna ilosc argumentów?
// może zrobić to tak fajnie że można przekażać dowolną ilość argumentów a interpreter je wszystkie zbiera
// (rozpakowuje range) w jedna konstrukcje aka liste. Ta lista jedyne na co pozwala to iterowanie
// przy iterowaniu moglbym uzyc konstrukcji for cell in args
// a w poszegolnych obrotach moglbym skorzystac z tego samego sposobu w jaki zaimplementuje alias
// zeby ustawiac aliasy na kolejne komorki w liscie
