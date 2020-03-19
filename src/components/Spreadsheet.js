import React, {useEffect} from 'react';
import {PropTypes as ObservablePropTypes} from "mobx-react";
import {observer} from "mobx-react";
import style from './Spreadsheet.module.scss'

const Spreadsheet = props => {

  /**
   * It returns strings like this: "A", "B", ... , "Z", "AA", "AB", ...
   */
  function* letterLabelGenerator() {

    function nextChar(c) {
      return String.fromCharCode(c.charCodeAt(0) + 1);
    }

    const label = ['A'];
    while (true) {
      yield label.slice().reverse().join("");
      let index = 0;
      label[index] = nextChar(label[index]);
      while (label[index].charCodeAt(0) > 'Z'.charCodeAt(0)) {
        label[index] = 'A';
        index++;
        if (index >= label.length) {
          label.push('A');
          break;
        }
        label[index] = nextChar(label[index]);
      }
    }
  }

  const rowLabelsGen = letterLabelGenerator();

  return (
    <div className={style.Spreadsheet}>
      <table className={style.SpreadsheetTable}>
        <thead>
        <tr>
          <th/>
          {props.cells.map((_, i) =>
            <th key={i}>
              {rowLabelsGen.next().value}
            </th>
          )}
        </tr>
        </thead>
        <tbody>
        {props.cells.map((row, i) =>
          <tr key={i}>
            <th key={-1}>{i + 1}</th>
            {row.map((cell, j) =>
              <td key={j}>
                {cell.value}
              </td>
            )}
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
};


Spreadsheet.propTypes = {
  cells: ObservablePropTypes.observableArray.isRequired,
};

export default observer(Spreadsheet);
