import React, { FC, useCallback, useEffect } from 'react';
import { useField } from 'formik';
import { useTheme } from '@material-ui/core';
import MonacoEditor from 'react-monaco-editor';
import { languages, editor } from 'monaco-editor/esm/vs/editor/editor.api';

import './monaco';

/* eslint-disable import/no-webpack-loader-syntax,import/no-extraneous-dependencies */
// NOTE: using loader syntax becuase Yaml worker imports editor.worker directly and that
// import shouldn't go through loader syntax.
import EditorWorker from 'worker-loader!monaco-editor/esm/vs/editor/editor.worker';
import YamlWorker from 'worker-loader!monaco-yaml/esm/yaml.worker';
/* eslint-enable import/no-webpack-loader-syntax,import/no-extraneous-dependencies */
import { YamlLanguage, Schema } from './types';

window.MonacoEnvironment = {
  getWorker(_: unknown, label: string) {
    if (label === 'yaml') {
      return new YamlWorker();
    }
    return new EditorWorker();
  },
};

interface Props {
  name: string;
  schemas?: Schema[];
}

const { yaml } = ((languages ?? {}) as unknown) as { yaml?: YamlLanguage };

const Editor: FC<Props> = ({ name, schemas }) => {
  const options: editor.IStandaloneEditorConstructionOptions = {
    selectOnLineNumbers: true,
    minimap: {
      enabled: false,
    },
    scrollBeyondLastLine: false,
    tabSize: 2,
  };
  const theme = useTheme();

  const [{ value }, , { setValue }] = useField<string>(name);

  useEffect(() => {
    yaml?.yamlDefaults.setDiagnosticsOptions({
      validate: true,
      schemas,
      enableSchemaRequest: true,
      hover: true,
      completion: true,
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
