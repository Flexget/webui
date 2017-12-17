import styled from 'react-emotion';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Button from 'material-ui/Button';
import { lighten } from 'polished';
import theme from 'theme';

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${theme.typography.pxToRem(theme.spacing.unit)};

  ${theme.breakpoints.up('sm')} {
    padding: ${theme.typography.pxToRem(theme.spacing.unit * 2)};
  }
`;

export const AddEntryButton = styled(Button)`
  color: ${theme.palette.primary[800]};
  
  &:hover {
    color: ${lighten(0.12, theme.palette.primary[800])};
  }
`;

export const Icon = styled(FontAwesomeIcon)`
  margin-right: ${theme.typography.pxToRem(theme.spacing.unit)};
  font-size: 1.6rem;
`;
