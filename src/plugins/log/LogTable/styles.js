import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Table as RVTable } from 'react-virtualized';

const color = (theme, hex) => css`
  ${theme.palette.type === 'light'
    ? css`
        background-color: ${hex};
      `
    : css`
        color: ${hex};
      `}
`;

export const Table = styled(RVTable)`
  font-size: 1rem;

  & .error {
    ${({ theme }) => color(theme, '#f2dede')};
  }

  & .critical {
    ${({ theme }) => color(theme, '#f2dede')};
  }

  & .warning {
    ${({ theme }) => color(theme, '#fcf8e3')};
  }
`;
