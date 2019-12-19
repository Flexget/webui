import styled from '@emotion/styled';

import { Icon, TextField } from '@material-ui/core';

export const RotatingIcon = styled(Icon)`
  transition: ${({ theme }) => theme.transitions.create()};
  transform: ${({ rotate }) => rotate && 'rotate(180deg)'};
`;

export const PaddedTextField = styled(TextField)`
  margin: 0.5rem 2rem 0.5rem;
`;
