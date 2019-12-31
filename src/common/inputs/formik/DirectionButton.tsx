import React, { useCallback, forwardRef } from 'react';
import { useFormikContext } from 'formik';
import { css } from '@emotion/core';
import { KeyboardArrowDown } from '@material-ui/icons';
import { IconButton, IconButtonProps, Theme } from '@material-ui/core';
import { Direction, toggleDirection } from 'utils/query';

export type Props = IconButtonProps & {
  name: string;
};

const iconBase = (theme: Theme) => css`
  transition: ${theme.transitions.create(['transform'])};
`;

const rotate = css`
  transform: rotate(180deg);
`;

const DirectionButton = forwardRef<HTMLButtonElement, Props>(
  ({ name, onClick = () => {}, ...props }, ref) => {
    const { values, setFieldValue, setFieldTouched } = useFormikContext<
      Record<string, Direction>
    >();

    const iconCss = useCallback(
      (theme: Theme) => [iconBase(theme), values.order === Direction.Desc && rotate],
      [values.order],
    );

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setFieldTouched(name, true);
        setFieldValue(name, toggleDirection(values[name]));
        onClick(e);
      },
      [name, onClick, setFieldTouched, setFieldValue, values],
    );

    return (
      <IconButton {...props} onClick={handleClick} name={name} ref={ref}>
        <KeyboardArrowDown css={iconCss} />
      </IconButton>
    );
  },
);

export default DirectionButton;
