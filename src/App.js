import React from 'react';
import './App.css';
import Spreadsheet from "./components/Spreadsheet";
import {SpreadsheetStore} from "./mobx/SpreadsheetStore";

const store = new SpreadsheetStore(5, 10);

function App() {
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

