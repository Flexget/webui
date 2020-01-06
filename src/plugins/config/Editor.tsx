import React, { FC, useCallback, useRef } from 'react';
import { useTheme } from '@material-ui/core';
import MonacoEditor from 'react-monaco-editor';
import { editor } from 'monaco-editor';
import { useGetConfig } from './hooks';

const Editor: FC = () => {
  const options: editor.IEditorConstructionOptions = {
    selectOnLineNumbers: true,
    minimap: {
      enabled: false,
    },
    scrollBeyondLastLine: false,
  };

  const theme = useTheme();

  const editorInstance = useRef<editor.IStandaloneCodeEditor>();
  const editorDidMount = useCallback((e: editor.IStandaloneCodeEditor) => {
    editorInstance.current = e;
  }, []);

  const [{ config }, setConfig] = useGetConfig();

  const handleChange = useCallback(
    (value: string) => {
      setConfig(value);
    },
    [setConfig],
  );

  return (
    <MonacoEditor
      language="yaml"
      theme={theme.palette.type}
      options={options}
      editorDidMount={editorDidMount}
      value={config}
      onChange={handleChange}
    />
  );
};

export default Editor;
