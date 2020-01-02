import React, { useCallback, forwardRef, useMemo } from 'react';
import { useFormikContext } from 'formik';
import { IconButtonProps } from '@material-ui/core';
import { Direction, toggleDirection } from 'utils/query';
import ExpandButton from 'common/ExpandButton';

export type Props = IconButtonProps & {
  name: string;
};

const DirectionButton = forwardRef<HTMLButtonElement, Props>(
  ({ name, onClick = () => {}, ...props }, ref) => {
    const { values, setFieldValue, setFieldTouched } = useFormikContext<
      Record<string, Direction>
    >();
    const open = useMemo(() => values.order === Direction.Desc, [values.order]);

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setFieldTouched(name, true);
        setFieldValue(name, toggleDirection(values[name]));
        onClick(e);
      },
      [name, onClick, setFieldTouched, setFieldValue, values],
    );

    return <ExpandButton {...props} open={open} onClick={handleClick} name={name} ref={ref} />;
  },
);

export default DirectionButton;
