/* eslint-disable no-eval */
import React, {useEffect} from 'react';
import './App.css';
import Spreadsheet from "./components/Spreadsheet";
import {SpreadsheetStore} from "./mobx/SpreadsheetStore";

const store = new SpreadsheetStore(5, 10);

function App() {

  useEffect(() => {

    store.cells[0][0].set("Self reference");
    store.cells[0][1].set("=B1");

    store.cells[1][0].set("Cycle");
    store.cells[1][1].set("=C2");
    store.cells[1][2].set("=B2");

    store.cells[2][0].set("Auto update working");
    store.cells[2][2].set("=B3");
    store.cells[2][3].set("=B3+C3");
    store.cells[2][1].set("coś");

    store.cells[3][0].set("Simple math");
    let x = "1+2*(5+5)+2/3+((1*3))/2";
    store.cells[3][1].set("=" + x);
    store.cells[3][2].set(`is ${eval(x)}`);

    store.cells[4][0].set("Complex math");
    x = "1-1+2*(5+5)+2/3+((1*3))/2";
    store.cells[4][1].set("=" + x);
    store.cells[4][2].set(`is ${eval(x)}`);

    store.cells[5][0].set("Negative numbers");
    x = "1-1+1";
    store.cells[5][1].set("=" + x);
    store.cells[5][2].set(`is ${eval(x)}`);

    store.cells[6][0].set("Math with labels");
    store.cells[6][1].set('=C7+D7*E7');
    store.cells[6][2].set('2');
    store.cells[6][3].set('2');
    store.cells[6][4].set('2');

    store.cells[7][0].set("Invalid formulas");
    store.cells[7][1].set('=C7D7*E7');
    store.cells[7][2].set('=as325');
    store.cells[7][3].set('=1**2');

    store.cells[8][0].set("* and / order");
    x = "3/3*3";
    store.cells[8][1].set("=" + x);
    store.cells[8][2].set(`is ${eval(x)}`);

  }, []);

  return (
    <div className="App">
      <Spreadsheet
        x={store.x}
        y={store.y}
        cells={store.cells}
        onCellSet={(cell,value) => {cell.set(value)}}
      />
    </div>
  );
}

export default App;

