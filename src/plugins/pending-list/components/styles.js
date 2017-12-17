import styled from 'react-emotion';
import theme from 'theme';

export const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${theme.typography.pxToRem(theme.spacing.unit)};

  ${theme.breakpoints.up('sm')} {
    padding: ${theme.typography.pxToRem(theme.spacing.unit * 2)};
  }
`;
