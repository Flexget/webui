import React, { useCallback } from 'react';
import { useField } from 'formik';
import { AutocompleteProps, Autocomplete as BaseAutocomplete, TextFieldProps, TextField } from '@mui/material';

type Props<Multiple extends boolean | undefined = undefined, T = any> = Omit<
  AutocompleteProps<T, Multiple, false, false>,
  'renderInput'
> & {
  name: string;
  InputProps: TextFieldProps;
};

const Autocomplete = ({ name, InputProps, multiple, ...props }: Props<typeof multiple>) => {
  const [field, { touched, error }, { setValue }] = useField(name);

  const handleChange = useCallback((_: React.SyntheticEvent, value: unknown) => setValue(value), [setValue]);

  return (
    <BaseAutocomplete
      renderInput={params => (
        <TextField error={touched && !!error} helperText={error} {...params} {...InputProps} />
      )}
      {...field}
      {...props}
      onChange={handleChange}
      multiple={multiple}
    />
  );
};

export default Autocomplete;
