import React, { FC } from 'react';
import { useField } from 'formik';
import { AutocompleteProps, Autocomplete as BaseAutocomplete } from '@material-ui/lab';
import { TextFieldProps, TextField } from '@material-ui/core';

type Props = Omit<AutocompleteProps, 'renderInput'> & {
  name: string;
  InputProps: TextFieldProps;
  renderInput?: AutocompleteProps['renderInput'];
};

const Autocomplete: FC<Props> = ({ name, InputProps, ...props }) => {
  const [field, { touched, error }] = useField(name);

  return (
    <BaseAutocomplete
      renderInput={params => (
        <TextField error={touched && !!error} helperText={error} {...params} {...InputProps} />
      )}
      {...field}
      {...props}
    />
  );
};

export default Autocomplete;
