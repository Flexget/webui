import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, useLocation } from 'react-router-dom';
import { StatusContainer, actions } from 'core/status/hooks';
import PrivateRoute from '../PrivateRoute';

const Routes = ({ routes }) => {
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

Routes.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      children: PropTypes.arrayOf(
        PropTypes.shape({
          path: PropTypes.string,
        }),
      ),
    }),
  ).isRequired,
};

export default Routes;
