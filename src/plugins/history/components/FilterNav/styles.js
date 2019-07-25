import styled from 'react-emotion';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import theme from 'theme';

export const RotatingIcon = styled(Icon)`
  transition: ${theme.transitions.create()};
  transform: ${({ rotate }) => rotate && 'rotate(180deg)'};
`;

export const PaddedTextField = styled(TextField)`
  margin: 0.5rem 2rem 0.5rem;
`;
