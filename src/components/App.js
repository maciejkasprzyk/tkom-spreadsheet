/* eslint-disable no-eval */
import React from 'react';
import Spreadsheet from "./Spreadsheet";
import {SpreadsheetStore} from "../mobx/SpreadsheetStore";
import style from './App.module.scss';
import Editor from "./Editor";
import {saveAs} from 'file-saver';
import {getCellIndexes} from "../utils";
import {observer} from "mobx-react";


const x = 5;
const y = 30;

export const store = new SpreadsheetStore(x, y);

function onSave(code,store) {
  const cells = store.cellsToObjects();
  const o = {
    'cells': cells,
    'code': code,
  };
  const blob = new Blob([JSON.stringify(o,null,1)], {
    type:'text/plain;charset=utf-8'
  })
  saveAs(blob, "spreadsheet.txt");
}

function onLoad(cells) {
  store.reset()

  for (const p in cells) {
    if (cells.hasOwnProperty(p)) {
      try{
        const indexes = getCellIndexes(p);
        const x = indexes.x;
        const y = indexes.y;
        store.onCellSet(x,y,cells[p])
      }
      catch (e) {

      }
    }
  }
}

function App() {

  // useEffect(populateSheet, []);

  return (
    <div className={style.App}>
      <Spreadsheet
        x={store.env.x}
        y={store.env.y}
        cells={store.env.cells}
        onCellSet={(x,y,v) => store.onCellSet(x,y,v)}
      />
      <Editor
        onLoad={cells=>onLoad(cells)}
        onSave={x=>onSave(x,store)}
        onSubmit={(code) => store.run(code)}
        onLogLexerOutput={(code) => store.logLexerOutput(code)}
        onLogParseTree={(code) => store.logParseTree(code)}
      />
    </div>
  );
}

export default observer(App);


