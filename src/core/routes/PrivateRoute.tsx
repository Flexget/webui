import React, { FC, ComponentType } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useContainer } from 'unstated-next';
import { AuthContainer } from 'core/auth/container';

interface Props extends RouteProps {
  component: ComponentType<any>;
}

const PrivateRoute: FC<Props> = ({ component: Component, ...rest }) => {
  const [loggedIn] = useContainer(AuthContainer);
  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }, // eslint-disable-line react/prop-types
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
