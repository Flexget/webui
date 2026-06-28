import React, { FC, useEffect } from 'react';
import { useField } from 'formik';
import { useTheme } from '@mui/material';
import MonacoEditor, { useMonaco } from '@monaco-editor/react';
import { configureMonacoYaml } from 'monaco-yaml';
import { Schema } from './types';

interface Props {
  name: string;
  schemas?: Schema[];
}

const editorOptions = {
  selectOnLineNumbers: true,
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  tabSize: 2,
};

const Editor: FC<Props> = ({ name, schemas }) => {
  const theme = useTheme();
  const monaco = useMonaco();

  const [{ value }, , { setValue }] = useField<string>(name);

  useEffect(() => {
    if (!monaco) return;
    const { dispose } = configureMonacoYaml(monaco, {
      validate: true,
      schemas,
      enableSchemaRequest: true,
      hover: true,
      completion: true,
    });
    return dispose;
  }, [monaco, schemas]);

  return (
    <MonacoEditor
      language="yaml"
      theme={theme.palette.mode}
      options={editorOptions}
      value={value}
      onChange={v => setValue(v ?? '')}
    />
  );
};

export default Editor;
