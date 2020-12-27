import React, { useCallback, ChangeEvent } from 'react';
import { useField } from 'formik';
import {
  AutocompleteProps,
  Autocomplete as BaseAutocomplete,
  UseAutocompleteSingleProps,
  UseAutocompleteMultipleProps,
} from '@material-ui/lab';
import { TextFieldProps, TextField } from '@material-ui/core';

type Props<Multiple extends boolean, T = any> = Omit<AutocompleteProps<T>, 'renderInput'> &
  (Multiple extends true ? UseAutocompleteMultipleProps<T> : UseAutocompleteSingleProps<T>) & {
    name: string;
    InputProps: TextFieldProps;
    renderInput?: AutocompleteProps<T>['renderInput']; // eslint-disable-line react/require-default-props
  };

const Autocomplete = ({ name, InputProps, multiple, ...props }: Props<typeof multiple>) => {
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
      multiple={multiple}
    />
  );
};

export default Autocomplete;
