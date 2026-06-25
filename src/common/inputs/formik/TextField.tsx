import React, { FC } from 'react';
import BaseTextField, { TextFieldProps } from '@material-ui/core/TextField';
import { useField } from 'formik';

export type Props = TextFieldProps & {
  name: string;
};

const TextField: FC<Props> = ({ name, helperText, ...props }) => {
  const [field, { touched, error }] = useField(name);

  return (
    <BaseTextField
      error={touched && !!error}
      helperText={touched && error ? error : helperText}
      {...field}
      {...props}
    />
  );
};

export default TextField;
