import React, { FC, useEffect } from 'react';
import { useContainer } from 'unstated-next';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { StaticContext } from 'react-router';
import { AuthContainer } from 'core/auth/hooks';
import { useFlexgetAPI } from 'core/api';
import LoginCard from './LoginCard';
import SplashScreen from './Splash';
import Logo from './Logo';

type Props = Partial<RouteComponentProps<{}, StaticContext, { from: Location }>>;

const LoginPage: FC<Props> = ({ location }) => {
  const { from } = location?.state ?? { from: { pathname: '/' } };
  const [loggedIn, setLoggedIn] = useContainer(AuthContainer);

  const [versionState, getVersion] = useFlexgetAPI('/server/version');

  useEffect(() => {
    const fn = async () => {
      const resp = await getVersion();
      if (resp.ok) {
        setLoggedIn(true);
      }
    };
    fn();
  }, [getVersion, setLoggedIn]);

  if (versionState.loading) {
    return <SplashScreen />;
  }

  if (loggedIn) {
    return <Redirect to={from} />;
  }

  return (
    <div>
      <Logo />
      <LoginCard />
    </div>
  );
};

export default LoginPage;
