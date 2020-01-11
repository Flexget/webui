import React, { FC, useCallback } from 'react';
import { useField } from 'formik';
import { useTheme } from '@material-ui/core';
import MonacoEditor from 'react-monaco-editor';
import { editor } from 'monaco-editor';

import '@magicsandbox/monaco-yaml/lib/esm/monaco.contribution';

window.MonacoEnvironment = {
  getWorkerUrl(_, label: string) {
    if (label === 'yaml') {
      return 'yaml.worker.bundle.js';
    }
    return 'editor.worker.bundle.js';
  },
};

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

  const setupYamlConfig = useCallback(monaco => {
    monaco.languages.yaml.yamlDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [
        {
          uri: 'http://myserver/foo-schema.json',
          fileMatch: ['*'],
          schema: {
            type: 'object',
            properties: {
              p1: {
                enum: ['v1', 'v2'],
              },
              p2: {
                $ref: 'http://myserver/bar-schema.json',
              },
            },
          },
        },
        {
          uri: 'http://myserver/bar-schema.json', // id of the first schema
          schema: {
            type: 'object',
            properties: {
              q1: {
                enum: ['x1', 'x2'],
              },
            },
          },
        },
      ],
    });
  }, []);

  const handleChange = useCallback((v: string) => setValue(v), [setValue]);

  return (
    <MonacoEditor
      language="yaml"
      theme={theme.palette.type}
      options={options}
      value={value}
      onChange={handleChange}
      editorWillMount={setupYamlConfig}
    />
  );
};

export default Editor;
