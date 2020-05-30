import React, {useState} from 'react';
import PropTypes from 'prop-types';
import style from './Editor.module.scss';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/webpack-resolver";
import {store} from "./App";
import {observer} from "mobx-react";


const Editor = props => {

  let [code, setCodeState] = useState("");

  // todo document this
  const setCode = (code) => {
    if (code[code.length - 1] !== '\n') {
      code += '\n';
    }
    setCodeState(code);
  }

  const onLoad = e => {

    const file = e.target.files[0];
    const fr = new FileReader();

    fr.addEventListener('load', e => {
      const text = e.target.result;
      const o = JSON.parse(text);

      const code = o.code;
      const cells = o.cells

      setCode(code);
      props.onSubmit(code)
      props.onLoad(cells)
    })
    fr.readAsText(file);

  };

  return (
    <div className={style.Editor}>

      <div className={style.Top}>
        <label className={style.customFileUpload}> Load <input type="file" onChange={onLoad}/> </label>
        <button onClick={() => props.onSave(code)}>Save</button>
      </div>

      <AceEditor
        mode="python"
        theme="cobalt"
        onChange={setCode}
        value={code}
        height={'100%'}
        width={'100%'}
        annotations={store.annotations}
      />
      <div className={style.Bottom}>
        <button onClick={() => props.onLogParseTree(code)}>Log parse tree</button>
        <button onClick={() => props.onLogLexerOutput(code)}>Log tokens</button>
        <button onClick={() => props.onSubmit(code)}>Run</button>
      </div>
    </div>
  );
};

Editor.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired,
  onLogLexerOutput: PropTypes.func.isRequired,
  onLogParseTree: PropTypes.func.isRequired,
  error: PropTypes.string,
  annotations: PropTypes.array,
};


export default observer(Editor);
