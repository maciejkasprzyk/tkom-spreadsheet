/* eslint-disable no-eval */
import React, {useEffect} from 'react';
import Spreadsheet from "./Spreadsheet";
import {SpreadsheetStore} from "../mobx/SpreadsheetStore";
import style from './App.module.scss';
import Editor from "./Editor";
import { saveAs } from 'file-saver';

const store = new SpreadsheetStore(5, 100);

function save(code,store) {
  const cells = store.cellsToObjects();
  const o = {
    'cells': cells,
    'code': code,
  };
  const blob = new Blob([JSON.stringify(o,null,1)], {
    type:'text/plain;charset=utf-8'
  })
  saveAs(blob, "code.txt");
}


function App() {

  useEffect(populateSheet, []);

  return (
    <div className={style.App}>
      <Spreadsheet
        x={store.env.x}
        y={store.env.y}
        cells={store.env.cells}
        onCellSet={(x,y,v) => store.onCellSet(x,y,v)}
      />
      <Editor
        examples={examples}
        onSave={x=>save(x,store)}
        onSubmit={(code) => store.run(code)}
        onLogLexerOutput={(code) => store.logLexerOutput(code)}
        onLogParseTree={(code) => store.logParseTree(code)}
      />
    </div>
  );
}

export default App;

const examples = [
  `i = 0
while i < 5
    [0;i] = i
    i = i + 1`,

`A1 = 1
i = 5
while i > 0
    i = i - 1
    a = A1
    A1 = a + 1`,

`if A1 == 5
    A2 = 5
else
    A2 = 10  
`,
`A1.background = "#52A"`,
`x = 5
A2 = 3
A1 = x + 10 + A2
`


];


function populateSheet() {

  // cells\[(.*)\]\[(.*)\].set\((.*)\);
  // store.onCellSet($2,$1,$3);

  let r = 0;

  store.onCellSet(0, r, "Self reference");


  store.onCellSet(0,r,"Self reference");
  store.onCellSet(1,r,"=B1");

  store.onCellSet(0,++r,"Cycle");
  store.onCellSet(1,r,"=C2");
  store.onCellSet(2,r,"=B2");

  store.onCellSet(0,++r,"Auto update working");
  store.onCellSet(2,r,"=B3");
  store.onCellSet(3,r,"=B3+C3");
  store.onCellSet(1,r,"coś");

  store.onCellSet(0,++r,"Simple math");
  let x = "1+2*(5+5)+2/3+((1*3))/2";
  store.onCellSet(1,r,"=" + x);
  store.onCellSet(2,r,`is ${eval(x)}`);

  store.onCellSet(0,++r,"Complex math");
  x = "1-1+2*(5+5)+2/3+((1*3))/2";
  store.onCellSet(1,r,"=" + x);
  store.onCellSet(2,r,`is ${eval(x)}`);

  store.onCellSet(0,++r,"Negative numbers");
  x = "1-1+1";
  store.onCellSet(1,r,"=" + x);
  store.onCellSet(2,r,`is ${eval(x)}`);

  store.onCellSet(0,++r,"Math with labels");
  store.onCellSet(1,r,'=C7+D7*E7');
  store.onCellSet(2,r,'2');
  store.onCellSet(3,r,'2');
  store.onCellSet(4,r,'2');

  store.onCellSet(0,++r,"Invalid formulas");
  store.onCellSet(1,r,'=C7D7*E7');
  store.onCellSet(2,r,'=as325');
  store.onCellSet(3,r,'=1**2');

  store.onCellSet(0,++r,"* and / order");
  x = "3/3*3";
  store.onCellSet(1,r,"=" + x);
  store.onCellSet(2,r,`is ${eval(x)}`);

  store.onCellSet(0,++r,"- at the begging and --");
  x = "-1+2";
  store.onCellSet(1,r,"=" + x);
  store.onCellSet(2,r,`is ${eval(x)}`);

  store.onCellSet(0,++r,"function call");
  store.onCellSet(1,r,"=sum(C11;D11;E11)");
  store.onCellSet(2,r,"1");
  store.onCellSet(3,r,"2");
  store.onCellSet(4,r,"3");

  store.onCellSet(0,++r,"function with range");
  store.onCellSet(1,r,"=sum(C11:E12)");
  store.onCellSet(2,r,"1");
  store.onCellSet(3,r,"2");
  store.onCellSet(4,r,"3");

  store.onCellSet(0,++r,"Not existing function");
  store.onCellSet(1,r,"=foo(C11:E12)");

  store.onCellSet(0,++r,"If");
  store.onCellSet(1,r,"=if(C14<D14;1;0)");
  store.onCellSet(2,r,"5");
  store.onCellSet(3,r,"6");


}
