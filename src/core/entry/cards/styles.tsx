import React, { FC } from 'react';
import theme from 'core/theme';
import { css } from '@emotion/core';

export const Bullet: FC<{ className?: string }> = ({ className }) => (
  <span
    css={css`
      display: inline-block;
      margin: 0 ${theme.typography.pxToRem(theme.spacing(1))};
    `}
    className={className}
  >
    •
  </span>
);
