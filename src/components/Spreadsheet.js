import React, {useState} from 'react';
import {observer} from "mobx-react";
import style from './Spreadsheet.module.scss'
import PropTypes from 'prop-types'

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

  let [isEditing, setEditing] = useEditing();


  const onInputKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.target.blur();
    }
  };

  const onBlur = (e, cell) => {
    cell.set(e.target.value);
    e.target.parentNode.classList.remove(style.focus)

  };

  const onFocus = (e, cell) => {
    e.target.value = cell.formula ? cell.formula : cell.value;
    e.target.parentNode.classList.add(style.focus)
  };

  const onClick = (e, cell) => {
    setEditing(cell.x, cell.y);
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
              <td
                onClick={e => onClick(e, cell)}
                key={j}>
                {isEditing(cell.x, cell.y) ?
                  <input
                    onKeyDown={onInputKeyDown}
                    onFocus={e => onFocus(e, cell)}
                    onBlur={e => onBlur(e, cell)}
                    autoFocus={true}
                  /> :
                  <div>
                    {cell.value}
                  </div>
                }
              </td>
            )}
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
};


function useEditing(initial) {

  let [editing, _setEditing] = useState(initial);

  const setEditing = (x, y) => {
    _setEditing({x: x, y: y})
  };

  const isEditing = (x, y) => {
    return editing && editing.x === x && editing.y === y;
  };

  return [isEditing, setEditing];
}


Spreadsheet.propTypes = {
  sheet: PropTypes.object.isRequired,
};

export default observer(Spreadsheet);
