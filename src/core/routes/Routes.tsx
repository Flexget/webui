import React, { useEffect, FC } from 'react';
import { useContainer } from 'unstated-next';
import { Switch, useLocation } from 'react-router-dom';
import { StatusContainer, actions } from 'core/status/hooks';
import { useGetRoutes } from 'core/routes/hooks';
import PrivateRoute from './PrivateRoute';

const Routes: FC = () => {
  const { routes } = useGetRoutes();

  const location = useLocation();
  const [, dispatch] = useContainer(StatusContainer);
  useEffect(() => dispatch(actions.clear()), [dispatch, location]);

  return (
    <Switch>
      {routes.map(props => {
        return <PrivateRoute {...props} key={props.path} />;
      })}
    </Switch>
  );
};

export default Routes;
