import React, { FC, useEffect } from 'react';
import { useContainer } from 'unstated-next';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContainer } from 'core/auth/hooks';
import { useFlexgetAPI } from 'core/api';
import LoginCard from './LoginCard';
import SplashScreen from './Splash';
import Logo from './Logo';

const LoginPage: FC = () => {
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/';
  const [loggedIn, setLoggedIn] = useContainer(AuthContainer);

  const [loginState, checkLogin] = useFlexgetAPI('/user/token');

  useEffect(() => {
    const fn = async () => {
      const resp = await checkLogin();
      if (resp.ok) {
        setLoggedIn(true);
      }
    };
    fn();
  }, [checkLogin, setLoggedIn]);

  if (loginState.loading) {
    return <SplashScreen />;
  }

  if (loggedIn) {
    return <Navigate to={from} replace />;
  }

  return (
    <div>
      <Logo />
      <LoginCard />
    </div>
  );
};

export default LoginPage;
