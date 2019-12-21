import React, { FC } from 'react';
import { css } from '@emotion/core';
import { Theme } from '@material-ui/core';

export const Bullet: FC<{ className?: string }> = ({ className }) => (
  <span
    css={(theme: Theme) => css`
      display: inline-block;
      margin: 0 ${theme.typography.pxToRem(theme.spacing(1))};
    `}
    className={className}
  >
    •
  </span>
);

export const titleArea = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ratingLine = css`
  display: flex;
  align-items: center;
`;
