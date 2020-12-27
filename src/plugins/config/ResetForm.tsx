import { useEffect, FC } from 'react';
import { useFormikContext } from 'formik';
import { FormState } from './types';

interface ResetProps {
  initialValues: FormState;
}

const ResetForm: FC<ResetProps> = ({ initialValues }) => {
  const { resetForm } = useFormikContext<FormState>();

  useEffect(() => {
    resetForm({ values: initialValues });
  }, [initialValues, resetForm]);

  return null;
};

export default ResetForm;
