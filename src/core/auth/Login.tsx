import React, { FC } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { AuthContainter } from 'core/auth/container';
import { useFlexgetAPI } from 'core/api';
import LoginCard from '../LoginCard';
import SplashScreen from '../Splash';
import { Logo } from './styles';
import { LoginReq } from './types';


const LoginPage: FC<RouteComponentProps> = ({ location }) => {
  const { from } = location.state || { from: { pathname: '/' } };
  const [loggedIn] = AuthContainter.useContainer();

  const { post, loading } = useFlexgetAPI('/auth/login');

  if (loggedIn) {
    return <Redirect to={from} />;
  }

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <div>
      <Logo />
      <LoginCard onSubmit={post} />
    </div>
  );
};

export default LoginPage;
