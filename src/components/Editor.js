import React, {useState} from 'react';
import PropTypes from 'prop-types';
import style from './Editor.module.scss';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-cobalt";


const Editor = props => {

  let [code, setCode] = useState("");


  return (
    <div
      className={style.Editor}
    >
      <div className={style.Top}>
        <button>Example 1</button>
        <button>Example 2</button>
        <button>Example 3</button>
      </div>
      <AceEditor
        theme="cobalt"
        onChange={setCode}
        value={code}
        height={'100%'}
        width={'100%'}
        // annotations={[{ row: 0, column: 10, type: 'error', text: 'Some error.'}]}
      />
      <div className={style.Bottom}>
        <button

          onClick={() => props.onSubmit(code)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

Editor.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default Editor;
