import React, { FC } from 'react';
import BaseTextField, { TextFieldProps } from '@material-ui/core/TextField';
import { useField } from 'formik';

type Props = TextFieldProps & {
  name: string;
};

const TextField: FC<Props> = ({ name, ...props }) => {
  const [field, { touched, error }] = useField(name);

  return <BaseTextField error={touched && !!error} helperText={error} {...field} {...props} />;
};

export default TextField;
