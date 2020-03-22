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
    store.cells[2][3].set("=C3");
    store.cells[2][1].set("coś");
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

