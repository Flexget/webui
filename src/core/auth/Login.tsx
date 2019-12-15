import React, { FC, useEffect } from 'react';
import { useContainer } from 'unstated-next';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { AuthContainer } from 'core/auth/container';
import { useFlexgetAPI } from 'core/api';
import { Method } from 'utils/fetch';
import { LoginReq } from 'core/auth/types';
import LoginCard from './LoginCard';
import SplashScreen from './Splash';
import { Logo } from './styles';

type Props = Partial<RouteComponentProps>;

const Card = LoginCard as any;

const LoginPage: FC<Props> = ({ location }) => {
  const { from } = location?.state || { from: { pathname: '/' } };
  const [loggedIn, setLoggedIn] = useContainer(AuthContainer);

  const [loginState, postLogin] = useFlexgetAPI('/auth/login', Method.Post);
  const [versionState, getVersion] = useFlexgetAPI('/server/version');

  const login = async (req: LoginReq) => {
    const resp = await postLogin(req);
    if (resp.ok) {
      setLoggedIn(true);
    }
  };

  useEffect(() => {
    const fn = async () => {
      const resp = await getVersion();
      if (resp.ok) {
        setLoggedIn(true);
      }
    };
    fn();
  }, [getVersion, setLoggedIn]);

  if (loggedIn) {
    return <Redirect to={from} />;
  }

  if (versionState.loading) {
    return <SplashScreen />;
  }

  return (
    <div>
      <Logo />
      <Card onSubmit={login} errorStatus={loginState.error} />
    </div>
  );
};

export default LoginPage;
