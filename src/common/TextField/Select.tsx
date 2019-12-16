import React, { FC } from 'react';
import { useMediaQuery, MenuItem } from '@material-ui/core';
import theme from 'core/theme';
import TextField, { Props as TextFieldProps } from './index';

interface Option {
  value: string;
  label: string;
}

type Props = TextFieldProps & {
  options: Option[];
};

const SelectField: FC<Props> = ({ options, ...props }) => {
  const native = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <TextField
      {...props}
      select
      SelectProps={{
        autoWidth: true,
        native,
      }}
    >
      {options.map(option =>
        native ? (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ) : (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ),
      )}
    </TextField>
  );
};

export default SelectField;
