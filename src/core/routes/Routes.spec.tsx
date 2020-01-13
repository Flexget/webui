import React, { FC, useEffect } from 'react';
import { cleanup } from '@testing-library/react';
import { AuthContainer } from 'core/auth/hooks';
import { MemoryRouter, Route, Switch, useHistory } from 'react-router';
import { Home } from '@material-ui/icons';
import { useContainer } from 'unstated-next';
import { renderWithWrapper } from 'utils/tests';
import Routes from './Routes';
import registry from './registry';

const LoginPage: FC = () => <div>Login Page</div>;

const PrivatePage: FC = () => <div>Private Page</div>;

interface Props {
  loggedIn?: boolean;
}

registry.registerPlugin('home', {
  routeDisplayName: 'Home',
  routeIcon: Home,
  component: PrivatePage,
});

const TestRoutes: FC<Props> = ({ loggedIn = false }) => {
  const [, setAuth] = useContainer(AuthContainer);

  useEffect(() => {
    setAuth(loggedIn);
  }, [loggedIn, setAuth]);

  const { push } = useHistory();

  useEffect(() => {
    push('/home');
  }, [push]);

  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route component={Routes} />
    </Switch>
  );
};

describe('core/routes/PrivateRoute', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders correctly when logged in', async () => {
    const { findByText } = renderWithWrapper(
      <MemoryRouter>
        <Route>
          <TestRoutes loggedIn />
        </Route>
      </MemoryRouter>,
    );

    expect(await findByText('Private Page')).toBeInTheDocument();
  });

  it('renders correctly when logged out', async () => {
    const { findByText } = renderWithWrapper(
      <MemoryRouter>
        <Route>
          <TestRoutes />
        </Route>
      </MemoryRouter>,
    );
    expect(await findByText('Login Page')).toBeInTheDocument();
  });
});
