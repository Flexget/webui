import React, { FC, forwardRef, useCallback, ChangeEvent } from 'react';
import { Checkbox as BaseCheckbox, CheckboxProps } from '@material-ui/core';
import { useField } from 'formik';

export type Props = CheckboxProps & {
  name: string;
};

const Checkbox: FC<Props> = forwardRef(({ name, ...props }, ref) => {
  const [field, , { setValue }] = useField(name);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.checked);
    },
    [setValue],
  );

  return (
    <BaseCheckbox
      {...field}
      {...props}
      name={name}
      ref={ref}
      value={name}
      onChange={handleChange}
    />
  );
});

export default Checkbox;
