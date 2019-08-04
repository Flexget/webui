import styled from '@emotion/styled';
import theme from 'theme';

export const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export const EntryWrapper = styled.div`
  width: 100%;
  padding: ${theme.typography.pxToRem(theme.spacing(2))};

  ${theme.breakpoints.up('sm')} {
    width: 100%;
  }

  ${theme.breakpoints.up('md')} {
    width: 50%;
  }
`;
