import React, {useEffect} from 'react';
import {PropTypes as ObservablePropTypes} from "mobx-react";
import {observer} from "mobx-react";
import style from './Spreadsheet.module.scss'

const Spreadsheet = props => {

  /**
   * It returns strings like this: "", "A", "B", ... , "Z", "AA", ...
   * Notice the empty string at the beginning.
   */
  function* letterLabelGenerator() {
    yield "";
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
    <table className={style.test}>
      <thead>
      <tr>
        {props.cells.map((_, i) =>
          <td key={i}>
            {rowLabelsGen.next().value}
          </td>
        )}
      </tr>
      </thead>
      <tbody>
      {props.cells.map((row, i) =>
        <tr key={i}>
          <td key={-1}>{i+1}</td>
          {row.map((cell, j) =>
            <td key={j}>
              {cell.value}
            </td>
          )}
        </tr>
      )}
      </tbody>
    </table>

  );
};


Spreadsheet.propTypes = {
  cells: ObservablePropTypes.observableArray.isRequired,
};

export default observer(Spreadsheet);
