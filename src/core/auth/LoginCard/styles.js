import styled from '@emotion/styled';
import { Field } from 'redux-form';
import theme from 'theme';

import { Card as MUICard, CardContent, Button } from '@material-ui/core';

export const Card = styled(MUICard)`
  max-width: 40rem;
  margin: 0 1rem;
  ${theme.breakpoints.up('sm')} {
    margin: 0 auto;
  }
`;

export const ErrorMessage = styled.div`
  color: ${theme.palette.error[500]};
  text-align: center;
  padding: 1rem;
`;

export const LoginButton = styled(Button)`
  width: 100%;
`;

export const Content = styled(CardContent)`
  display: flex;
  flex-direction: column;
`;

export const LoginField = styled(Field)`
  padding-bottom: 1rem;
`;
