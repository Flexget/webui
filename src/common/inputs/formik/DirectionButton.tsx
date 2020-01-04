import React, { useCallback, forwardRef, useMemo } from 'react';
import { useField } from 'formik';
import { IconButtonProps } from '@material-ui/core';
import { Direction, toggleDirection } from 'utils/query';
import ExpandButton from 'common/ExpandButton';

export type Props = IconButtonProps & {
  name: string;
};

const DirectionButton = forwardRef<HTMLButtonElement, Props>(
  ({ name, onClick = () => {}, ...props }, ref) => {
    const [{ value }, , { setValue }] = useField<Direction>(name);
    const open = useMemo(() => value === Direction.Desc, [value]);

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setValue(toggleDirection(value));
        onClick(e);
      },
      [onClick, setValue, value],
    );

    return <ExpandButton {...props} open={open} onClick={handleClick} name={name} ref={ref} />;
  },
);

export default DirectionButton;
