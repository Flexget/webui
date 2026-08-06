import { FC, useEffect } from 'react';
import { useField } from 'formik';
import { useTheme } from '@mui/material';
import MonacoEditor, { loader, useMonaco } from '@monaco-editor/react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { configureMonacoYaml } from 'monaco-yaml';
import { Schema } from './types';

// @monaco-editor/react defaults to fetching monaco from a CDN, bypassing the
// locally webpack-bundled monaco-editor (and its yaml worker setup below).
loader.config({ monaco });

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
      schemas: schemas?.filter((s): s is Required<typeof s> => !!s.fileMatch),
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
