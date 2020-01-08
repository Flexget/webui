import React, { FC, useCallback } from 'react';
import { useField } from 'formik';
import { useTheme } from '@material-ui/core';
import MonacoEditor from 'react-monaco-editor';
import { editor } from 'monaco-editor';

interface Props {
  name: string;
}

const Editor: FC<Props> = ({ name }) => {
  const options: editor.IEditorConstructionOptions = {
    selectOnLineNumbers: true,
    minimap: {
      enabled: false,
    },
    scrollBeyondLastLine: false,
  };
  const theme = useTheme();

  const [{ value }, , { setValue }] = useField<string>(name);

  const handleChange = useCallback((v: string) => setValue(v), [setValue]);

  return (
    <MonacoEditor
      language="yaml"
      theme={theme.palette.type}
      options={options}
      value={value}
      onChange={handleChange}
    />
  );
};

export default Editor;
