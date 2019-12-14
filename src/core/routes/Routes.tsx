import React, { useEffect, FC } from 'react';
import { Switch, useLocation } from 'react-router-dom';
import { StatusContainer, actions } from 'core/status/hooks';
import { RouteContainer } from 'core/routes/hooks';
import PrivateRoute from './PrivateRoute';

const Routes: FC = () => {
  const [routes] = RouteContainer.useContainer();

  const location = useLocation();
  const [, dispatch] = StatusContainer.useContainer();
  useEffect(() => dispatch(actions.clear()), [dispatch, location]);

  return (
    <Switch>
      {routes.map(({ children, ...pr }) => {
        if (children) {
          return (children || []).map(p => <PrivateRoute exact {...p} key={p.path} />);
        }
        return <PrivateRoute exact {...pr} key={pr.path} />;
      })}
    </Switch>
  );
};

export default Routes;
