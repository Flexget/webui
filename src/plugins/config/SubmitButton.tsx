import React, { useEffect, FC } from 'react';
import { useFormikContext } from 'formik';
import { Button } from '@material-ui/core';
import { FormState } from './Config';

interface SubmitProps {
  loading: boolean;
}
const SubmitButton: FC<SubmitProps> = ({ loading, children }) => {
  const { submitForm, isSubmitting, setSubmitting } = useFormikContext<FormState>();
  useEffect(() => {
    setSubmitting(loading);
  }, [loading, setSubmitting]);
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={submitForm}
      disabled={isSubmitting}
      type="submit"
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
