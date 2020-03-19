import React from 'react';
import './App.css';
import Spreadsheet from "./components/Spreadsheet";
import {SpreadsheetStore} from "./mobx/SpreadsheetStore";

const store = new SpreadsheetStore(5, 10);

function App() {
  return (
    <div className="App">
      <Spreadsheet sheet={store}/>
    </div>
  );
}

export default App;

