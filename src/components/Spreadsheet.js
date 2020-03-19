import React from 'react';
import {observer, PropTypes as ObservablePropTypes} from "mobx-react";
import style from './Spreadsheet.module.scss'

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


const Spreadsheet = props => {

  const onInputKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.target.blur();
    }
  };

  const onBlur = (e, cell) => {
    cell.set(e.target.value);
    e.target.value = cell.value;
    e.target.parentNode.classList.remove(style.focus)

  };

  const onFocus = (e, cell) => {
    if (cell.formula) {
      e.target.value = cell.formula;
    }
    e.target.parentNode.classList.add(style.focus)
  };

  const rowLabelsGen = letterLabelGenerator();

  return (
    <div className={style.Spreadsheet}>
      <table>
        <thead>
        <tr>
          <th/>
          {Array(props.sheet.x).fill(0).map((_, i) =>
            <th key={i}>
              {rowLabelsGen.next().value}
            </th>
          )}
        </tr>
        </thead>
        <tbody>
        {props.sheet.cells.map((row, i) =>
          <tr key={i}>
            <th>{i + 1}</th>
            {row.map((cell, j) =>
              <td key={j}>
                <input
                  onKeyDown={onInputKeyDown}
                  onFocus={e => onFocus(e, cell)}
                  onBlur={e => onBlur(e, cell)}
                  defaultValue={cell.value}
                />
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
  sheet: ObservablePropTypes.observableObject.isRequired,
};

export default observer(Spreadsheet);
