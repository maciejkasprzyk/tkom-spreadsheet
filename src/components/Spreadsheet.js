import React, {useState} from 'react';
import {observer} from "mobx-react";
import style from './Spreadsheet.module.scss'
import PropTypes from 'prop-types'
import {letterLabelGenerator} from "../utils";
import ReactTooltip from "react-tooltip";


const Spreadsheet = props => {

  let [isEditing, setEditing] = useEditing();


  const onInputKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.target.blur();
    }
  };

  const onBlur = (e, cell) => {
    props.onCellSet(cell.x, cell.y, e.target.value);
    e.target.parentNode.classList.remove(style.focus);
    if (isEditing(cell)) {
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

  const getContent = (tip) => {
    if (tip === null) {
      return null;
    }
    let [i,j] = tip.split(" ");
    i = parseInt(i)
    j = parseInt(j)
    const cell = props.cells[i][j];
    if (cell.error !== null) {
      return cell.error
    }
    if (cell.value !== null) {
      return cell.value;
    }
    return null
  }

  const rowLabelsGen = letterLabelGenerator();

  return (
    <div className={style.Spreadsheet}>
      <ReactTooltip
        id='tooltip'
        getContent={(tip) => getContent(tip)}
      />
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
                key={j}
                data-tip={i + ' ' + j}
                data-for='tooltip'
              >

                {isEditing(cell) ?
                  <input
                    onKeyDown={onInputKeyDown}
                    onFocus={e => onFocus(e, cell)}
                    onBlur={e => onBlur(e, cell)}
                    autoFocus={true}
                  /> :
                  <div
                    className={`${style.cell} ${cell.error ? style.error : ""}`}
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
    } else {
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
