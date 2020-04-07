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
        {props.examples.map((example, i) =>
          <button
            key={i}
            onClick={() => setCode(example)}
          > Example {i} </button>

        )}
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
  onSubmit: PropTypes.func.isRequired,
  examples: PropTypes.array,
};


Editor.defaultProps = {
  examples: ["123","hello world"],
};



export default Editor;
