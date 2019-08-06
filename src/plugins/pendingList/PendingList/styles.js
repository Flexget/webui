import styled from '@emotion/styled';
import theme from 'theme';

export const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${theme.typography.pxToRem(theme.spacing(1))};

  ${theme.breakpoints.up('sm')} {
    padding: ${theme.typography.pxToRem(theme.spacing(2))};
  }
`;
