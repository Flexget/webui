import React, { FC } from 'react';
import { Formik } from 'formik';
import { ExecuteTaskRequest } from './types';
import { useExecuteTaskStream } from './hooks';
import ExecuteDialog from './ExecuteDialog';

const initialValues: ExecuteTaskRequest = {
  tasks: [],
  progress: true,
  summary: true,
  entryDump: true,
};

const Execute: FC = () => {
  const [{ readyState }, { execute }] = useExecuteTaskStream();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(value, { setSubmitting }) => {
        execute(value);
        setSubmitting(false);
      }}
    >
      <ExecuteDialog readyState={readyState} />
    </Formik>
  );
};

export default Execute;
