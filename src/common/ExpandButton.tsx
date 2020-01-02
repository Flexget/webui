import React, { useCallback, forwardRef } from 'react';
import { css } from '@emotion/core';
import { ExpandMore } from '@material-ui/icons';
import { IconButton, IconButtonProps, Theme } from '@material-ui/core';

export type Props = IconButtonProps & {
  open: boolean;
};

const iconBase = (theme: Theme) => css`
  transition: ${theme.transitions.create(['transform'])};
`;

const rotate = css`
  transform: rotate(180deg);
`;

const ExpandButton = forwardRef<HTMLButtonElement, Props>(({ open, ...props }, ref) => {
  const iconCss = useCallback((theme: Theme) => [iconBase(theme), open && rotate], [open]);

  return (
    <IconButton {...props} css={iconCss} ref={ref}>
      <ExpandMore />
    </IconButton>
  );
});

export default ExpandButton;
