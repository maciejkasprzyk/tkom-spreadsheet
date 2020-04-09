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
    props.onCellSet(cell, e.target.value);
    e.target.parentNode.classList.remove(style.focus);
    if (isEditing(cell)){
      setEditing(null);
    }
  };

  const onFocus = (e, cell) => {
    e.target.value = cell.formula ? cell.formula : cell.value;
    e.target.parentNode.classList.add(style.focus)
  };

  const onClick = (e, cell) => {
    setEditing(cell);
  };

  const rowLabelsGen = letterLabelGenerator();

  return (
    <div className={style.Spreadsheet}>
      <table>
        <thead>
        <tr>
          <th/>
          {Array(props.x).fill(0).map((_, i) =>
            <th key={i}>
              {rowLabelsGen.next().value}
            </th>
          )}
        </tr>
        </thead>
        <tbody>
        {props.cells.map((row, i) =>
          <tr key={i}>
            <th>{i + 1}</th>
            {row.map((cell, j) =>
              <td
                style={{backgroundColor: cell.background}}
                onClick={e => onClick(e, cell)}
                key={j}>
                {isEditing(cell) ?
                  <input
                    onKeyDown={onInputKeyDown}
                    onFocus={e => onFocus(e, cell)}
                    onBlur={e => onBlur(e, cell)}
                    autoFocus={true}
                  /> :
                  <div
                    className={cell.error ? style.error : ""}
                  >
                    {cell.error ? cell.error : cell.value}
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

  const setEditing = (cell) => {
    if (cell == null) {
      _setEditing(null)
    }
    else {
      _setEditing({x: cell.x, y: cell.y})
    }
  };

  const isEditing = (cell) => {
    return editing && editing.x === cell.x && editing.y === cell.y;
  };

  return [isEditing, setEditing];
}


Spreadsheet.propTypes = {
  cells: PropTypes.arrayOf(PropTypes.array).isRequired,
  onCellSet: PropTypes.func.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default observer(Spreadsheet);
