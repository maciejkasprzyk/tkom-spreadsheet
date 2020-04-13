/* eslint-disable no-eval */
import React, {useEffect} from 'react';
import Spreadsheet from "./Spreadsheet";
import {SpreadsheetStore} from "../mobx/SpreadsheetStore";
import {functions} from "../parser/functions";
import style from './App.module.scss';
import Editor from "./Editor";
import {lexer} from '../parser/lexer';
import {Parser} from "../parser/parsers";

const store = new SpreadsheetStore(5, 100, functions);

function App() {

  useEffect(populateSheet, []);

  function run(code) {
    if (code === "") {
      return;
    }
    try {
      const parser = new Parser();
      parser.feed(code);
      store.exec(parser.results);
    } catch (e) {
      if (e.name !== "UserError") {
        throw e;
      }
      // todo fancy errors
      console.log(e.message);
    }
  }

  function logParseTree(code) {
    try {
      const parser = new Parser();
      parser.feed(code);
      console.log(parser.results);
    } catch (e) {
      if (e.name !== "UserError") {
        throw e;
      }
      console.log(e.message);
    }
  }

  function logLexerOutput(code) {
    try {
      lexer.reset(code);
      const result = [];
      let tok = lexer.next();
      while (tok !== undefined) {
        result.push(tok);
        tok = lexer.next()
      }
      console.log(result);
    } catch (e) {
      if (e.name !== "UserError") {
        throw e;
      }

      console.log(e.message);
    }
  }

  return (
    <div className={style.App}>
      <Spreadsheet
        x={store.x}
        y={store.y}
        cells={store.cells}
        onCellSet={(cell, value, isFormula) => {
          cell.set(value, isFormula)
        }}
      />
      <Editor
        examples={examples}
        onSubmit={run}
        onLogLexerOutput={logLexerOutput}
        onLogParseTree={logParseTree}
      />
    </div>
  );
}

export default App;

const examples = [
  `i = 0
while i < 5
  cell[15][i] = i
  i = i + 1`,

  `i = 2
while i > 0
  i = i - 1`,

  `a
  b
  b
    c
a`
];


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
  cells[r][1].set("=foo(C11:E12)")

  cells[++r][0].set("If");
  cells[r][1].set("=if(C14<D14;1;0)");
  cells[r][2].set("5");
  cells[r][3].set("6");


}
