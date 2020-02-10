import React, { useState, useCallback, useMemo, FC } from 'react';
import { hot } from 'react-hot-loader/root';
import { Formik } from 'formik';
import { useInjectPageTitle } from 'core/layout/AppBar/hooks';
import { Button, Theme, Link } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useGlobalStatus } from 'core/status/hooks';
import { NoPaddingWrapper } from 'common/styles';
import { css } from '@emotion/core';
import { useGetConfig, useGetVariables, useGetSchema } from './hooks';
import { Mode } from './types';
import Editor from './Editor';
import SubmitButton from './SubmitButton';
import ResetForm from './ResetForm';

export interface FormState {
  yaml: string;
}

const toolbar = (theme: Theme) => css`
  display: flex;
  align-items: center;
  padding: ${theme.typography.pxToRem(theme.spacing(2))}
    ${theme.typography.pxToRem(theme.spacing(4))};
`;

const varDescription = (theme: Theme) => css`
  margin: ${theme.typography.pxToRem(theme.spacing(2))}
    ${theme.typography.pxToRem(theme.spacing(4))};
  margin-bottom: 0;
`;

const button = (theme: Theme) => css`
  margin-right: ${theme.typography.pxToRem(theme.spacing(2))};
`;

const alert = css`
  flex: 1;
`;

const Config: FC = () => {
  useInjectPageTitle('Config Editor');

  const [mode, setMode] = useState<Mode>('config');
  const [{ config, state: configState }, saveConfig] = useGetConfig();
  const [{ variables, state: variablesState }, saveVariables] = useGetVariables();
  const { schemas } = useGetSchema();

  const toggleMode = useCallback(() => setMode(m => (m === 'config' ? 'variables' : 'config')), []);

  const { yaml, save, loadText, submitText, getState, saveState } =
    mode === 'config'
      ? {
          loadText: 'Load Variables',
          submitText: 'Save Config',
          yaml: config,
          save: saveConfig,
          getState: configState.get,
          saveState: configState.post,
        }
      : {
          loadText: 'Load Config',
          submitText: 'Save Variables',
          yaml: variables,
          save: saveVariables,
          getState: variablesState.get,
          saveState: variablesState.post,
        };

  useGlobalStatus(getState.loading, getState.error ?? saveState.error);

  const initialValues = useMemo(
    () => ({
      yaml,
    }),
    [yaml],
  );

  const handleSubmit = useCallback((v: FormState) => save(v.yaml), [save]);
  const schemaValues = useMemo(() => (mode === 'config' ? schemas : undefined), [mode, schemas]);

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <NoPaddingWrapper>
        <ResetForm initialValues={initialValues} />
        <p css={varDescription}>
          Variables allow you reuse sections of your config file. They are also useful for hiding
          sensitive information like passwords.
          <br /> Any variables you create in the WebUI are saved in the DB and not to a file. You
          can find out more <Link href="https://flexget.com/Plugins/variables">here</Link>.
        </p>
        <div css={toolbar}>
          <div>
            <Button
              css={button}
              variant="contained"
              onClick={toggleMode}
              disabled={getState.loading}
              type="button"
            >
              {loadText}
            </Button>
            <SubmitButton loading={saveState.loading} css={button}>
              {submitText}
            </SubmitButton>
          </div>
          <Alert severity="warning" css={alert}>
            Taking a backup is recommended before saving a new config.
          </Alert>
        </div>
        <Editor name="yaml" schemas={schemaValues} />
      </NoPaddingWrapper>
    </Formik>
  );
};

export default hot(Config);
