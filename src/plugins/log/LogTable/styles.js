import styled from '@emotion/styled';
import { Table as RVTable } from 'react-virtualized';

export const Table = styled(RVTable)`
  font-size: 1rem;

  & .error {
    background-color: #f2dede;
  }

  & .critical {
    background-color: #f2dede;
  }

  & .warning {
    background-color: #fcf8e3;
  }
`;
