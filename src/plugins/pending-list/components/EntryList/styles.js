import styled from 'react-emotion';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Button from 'material-ui/Button';
import { lighten } from 'polished';
import theme from 'theme';

export const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export const EntryWrapper = styled.div`
  width: 100%;
  padding: ${theme.typography.pxToRem(theme.spacing.unit * 2)};

  ${theme.breakpoints.up('sm')} {
    width: 25%;
    padding: ${theme.typography.pxToRem(theme.spacing.unit * 2)};
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
