/* eslint-disable no-eval */
import React, {useEffect} from 'react';
import Spreadsheet from "./Spreadsheet";
import {SpreadsheetStore} from "../mobx/SpreadsheetStore";
import {functions} from "../interpreter/functions";
import style from './App.module.scss';
import Editor from "./Editor";

const store = new SpreadsheetStore(5, 100, functions);

function App() {

  useEffect(populateSheet, []);

  return (
    <div className={style.App}>
      <Spreadsheet
        x={store.x}
        y={store.y}
        cells={store.cells}
        onCellSet={(cell, value) => {
          cell.set(value)
        }}
      />
      <Editor
        // todo
        onSubmit={(x) => {
          console.log(x)
        }}
      />
    </div>
  );
}

export default App;


function populateSheet() {

  const cells = store.cells;

  let r = 0;

  cells[r][0].set("Self reference");
  cells[r][1].set("=B1");

  cells[++r][0].set("Cycle");
  cells[r][1].set("=C2");
  cells[r][2].set("=B2");

  cells[++r][0].set("Auto update working");
  cells[r][2].set("=B3");
  cells[r][3].set("=B3+C3");
  cells[r][1].set("coś");

  cells[++r][0].set("Simple math");
  let x = "1+2*(5+5)+2/3+((1*3))/2";
  cells[r][1].set("=" + x);
  cells[r][2].set(`is ${eval(x)}`);

  cells[++r][0].set("Complex math");
  x = "1-1+2*(5+5)+2/3+((1*3))/2";
  cells[r][1].set("=" + x);
  cells[r][2].set(`is ${eval(x)}`);

  cells[++r][0].set("Negative numbers");
  x = "1-1+1";
  cells[r][1].set("=" + x);
  cells[r][2].set(`is ${eval(x)}`);

  cells[++r][0].set("Math with labels");
  cells[r][1].set('=C7+D7*E7');
  cells[r][2].set('2');
  cells[r][3].set('2');
  cells[r][4].set('2');

  cells[++r][0].set("Invalid formulas");
  cells[r][1].set('=C7D7*E7');
  cells[r][2].set('=as325');
  cells[r][3].set('=1**2');

  cells[++r][0].set("* and / order");
  x = "3/3*3";
  cells[r][1].set("=" + x);
  cells[r][2].set(`is ${eval(x)}`);

  cells[++r][0].set("- at the begging and --");
  x = "-1+2";
  cells[r][1].set("=" + x);
  cells[r][2].set(`is ${eval(x)}`);

  cells[++r][0].set("function call");
  cells[r][1].set("=sum(C11;D11;E11)");
  cells[r][2].set("1");
  cells[r][3].set("2");
  cells[r][4].set("3");

  cells[++r][0].set("function with range");
  cells[r][1].set("=sum(C11:E12)");
  cells[r][2].set("1");
  cells[r][3].set("2");
  cells[r][4].set("3");

  cells[++r][0].set("Not existing function");
  cells[r][1].set("=foo(C11:E12)");

}
