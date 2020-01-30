import React, { FC, useCallback, ChangeEvent } from 'react';
import { useField } from 'formik';
import { AutocompleteProps, Autocomplete as BaseAutocomplete } from '@material-ui/lab';
import { TextFieldProps, TextField } from '@material-ui/core';

type Props = Omit<AutocompleteProps, 'renderInput'> & {
  name: string;
  InputProps: TextFieldProps;
  renderInput?: AutocompleteProps['renderInput'];
};

const Autocomplete: FC<Props> = ({ name, InputProps, ...props }) => {
  const [field, { touched, error }, { setValue }] = useField(name);

  const handleChange = useCallback((_: ChangeEvent, value: unknown) => setValue(value), [setValue]);

  return (
    <BaseAutocomplete
      renderInput={params => (
        <TextField error={touched && !!error} helperText={error} {...params} {...InputProps} />
      )}
      {...field}
      {...props}
      onChange={handleChange}
    />
  );
};

export default Autocomplete;
