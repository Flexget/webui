import React, { FC, useCallback, useEffect, useRef } from 'react';
import { useField } from 'formik';
import { useTheme } from '@material-ui/core';
import MonacoEditor from 'react-monaco-editor';
import { languages, editor } from 'monaco-editor';
import { uriParser } from 'utils';
import { YamlLanguage, Schema } from './types';

window.MonacoEnvironment = {
  getWorkerUrl(_: unknown, label: string) {
    if (label === 'yaml') {
      return 'yaml.worker.bundle.js';
    }
    return 'editor.worker.bundle.js';
  },
};

interface Props {
  name: string;
  schemas?: Schema[];
}

const { yaml } = ((languages ?? {}) as unknown) as { yaml?: YamlLanguage };

const Editor: FC<Props> = ({ name, schemas }) => {
  const options: editor.IEditorConstructionOptions = {
    selectOnLineNumbers: true,
    minimap: {
      enabled: false,
    },
    scrollBeyondLastLine: false,
  };
  const theme = useTheme();

  const [{ value }, , { setValue }] = useField<string>(name);
  const baseURI = useRef(uriParser(document.baseURI));

  useEffect(() => {
    yaml?.yamlDefaults.setDiagnosticsOptions({
      validate: true,
      schemas,
      enableSchemaRequest: true,
      prefix: `${baseURI.current.pathname}api`,
    });
  }, [schemas]);

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
