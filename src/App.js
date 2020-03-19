import React from 'react';
import './App.css';
import Spreadsheet from "./components/Spreadsheet";
import {SpreadsheetStore} from "./mobx/SpreadsheetStore";

const store = new SpreadsheetStore(10, 10);

function App() {
  return (
    <div className="App">
      <Spreadsheet cells={store.cells}/>
    </div>
  );
}

export default App;

