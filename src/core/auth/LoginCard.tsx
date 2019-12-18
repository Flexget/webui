import React, { FC } from 'react';
import { Form, Formik } from 'formik';
import { useContainer } from 'unstated-next';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { CardContent, Card, Button, CardActions } from '@material-ui/core';
import { useFlexgetAPI } from 'core/api';
import { Method } from 'utils/fetch';
import TextField from 'common/inputs/formik/TextField';
import theme from 'core/theme';
import { AuthContainer } from './container';
import { LoginReq } from './types';

const card = css`
  max-width: 40rem;
  margin: 0 1rem;
  ${theme.breakpoints.up('sm')} {
    margin: 0 auto;
  }
`;

const field = css`
  padding-bottom: 1rem;
`;

const ErrorMessage = styled.div`
  color: ${theme.palette.error[500]};
  text-align: center;
  padding: 1rem;
`;

const content = css`
  display: flex;
  flex-direction: column;
`;

const LoginCard: FC = () => {
  const initialValues: LoginReq = { username: 'flexget', password: '' };
  const [, setLoggedIn] = useContainer(AuthContainer);

  const [{ error, loading }, login] = useFlexgetAPI('/auth/login', Method.Post);

  return (
    <Card css={card}>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          const resp = await login(values);
          if (resp.ok) {
            actions.resetForm();
            setLoggedIn(true);
          }
        }}
      >
        <Form>
          <CardContent css={content}>
            <ErrorMessage>{error?.message}</ErrorMessage>
            <TextField css={field} name="username" id="username" label="Username" autoFocus />
            <TextField css={field} name="password" id="password" label="Password" type="Password" />
          </CardContent>
          <CardActions>
            <Button type="submit" fullWidth disabled={loading}>
              Login
            </Button>
          </CardActions>
        </Form>
      </Formik>
    </Card>
  );
};

export default LoginCard;
