import React, { FC } from 'react';
import { Formik } from 'formik';
import { Button, Theme } from '@material-ui/core';
import { useOverlayState } from 'utils/hooks';
import { css } from '@emotion/core';
import { ExecuteTaskRequest } from './types';
import { useExecuteTaskStream } from './hooks';
import ExecuteDialog from './ExecuteDialog';

const initialValues: ExecuteTaskRequest = {
  tasks: [],
  progress: true,
  summary: true,
  entryDump: true,
};

const buttonWrapper = (theme: Theme) => css`
  text-align: right;
  margin-bottom: ${theme.typography.pxToRem(theme.spacing(2))};
`;

const Execute: FC = () => {
  const [{ readyState }, { execute }] = useExecuteTaskStream();
  const [isOpen, { open, close }] = useOverlayState();
  return (
    <>
      <div css={buttonWrapper}>
        <Button onClick={open} color="primary" variant="contained">
          Execute
        </Button>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={(value, { setSubmitting }) => {
          execute(value);
          setSubmitting(false);
        }}
      >
        <ExecuteDialog readyState={readyState} close={close} open={isOpen} />
      </Formik>
    </>
  );
};

export default Execute;
