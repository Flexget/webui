import React, { FC, useEffect } from 'react';
import { cleanup } from '@testing-library/react';
import { AuthContainer } from 'core/auth/hooks';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Home, PowerSettingsNew } from '@material-ui/icons';
import { useContainer } from 'unstated-next';
import { renderWithWrapper } from 'utils/tests';
import AppRoutes from './Routes';
import { registerPlugin } from '../plugins/registry';

const LoginPage: FC = () => <div>Login Page</div>;

const PrivatePage: FC = () => <div>Private Page</div>;

interface Props {
  loggedIn?: boolean;
}

registerPlugin('/home', {
  displayName: 'Home',
  icon: Home,
  component: PrivatePage,
});

registerPlugin('settings', {
  displayName: 'Settings',
  icon: PowerSettingsNew,
  cardComponent: () => <div />,
});

const TestRoutes: FC<Props> = ({ loggedIn = false }) => {
  const [, setAuth] = useContainer(AuthContainer);

  useEffect(() => {
    setAuth(loggedIn);
  }, [loggedIn, setAuth]);

  const navigate = useNavigate();

  useEffect(() => {
    navigate('/home'); // eslint-disable-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<AppRoutes />} />
    </Routes>
  );
};

describe('core/routes/PrivateRoute', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders correctly when logged in', async () => {
    const { findByText } = renderWithWrapper(<TestRoutes loggedIn />);

    expect(await findByText('Private Page')).toBeInTheDocument();
  });

  it('renders correctly when logged out', async () => {
    const { findByText } = renderWithWrapper(<TestRoutes />);
    expect(await findByText('Login Page')).toBeInTheDocument();
  });
});
