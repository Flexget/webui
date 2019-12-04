import React, { FC, useEffect } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { AuthContainter } from 'core/auth/container';
import { useFlexgetAPI } from 'core/api';
import LoginCard from './LoginCard';
import SplashScreen from './Splash';
import { Logo } from './styles';
import { LoginReq } from './types';

const LoginPage: FC<RouteComponentProps> = ({ location }) => {
  const { from } = location.state || { from: { pathname: '/' } };
  const [loggedIn, { login }] = AuthContainter.useContainer();

  const [loginState, { post: postLogin }] = useFlexgetAPI('/auth/login');
  const [versionState, { get: getVersion }] = useFlexgetAPI('/server/version');

  const handleSubmit = async (req: LoginReq) => {
    const response = await postLogin(req);
    if (response?.ok) {
      login();
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await getVersion();
      if (response?.ok) {
        login();
      }
    };

    fetch();
  }, [getVersion, login]);

  if (loggedIn) {
    return <Redirect to={from} />;
  }

  if (versionState.loading) {
    return <SplashScreen />;
  }

  return (
    <div>
      <Logo />
      <LoginCard onSubmit={handleSubmit} errorStatus={loginState.error} />
    </div>
  );
};

export default LoginPage;
