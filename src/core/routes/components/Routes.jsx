import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

const Routes = ({ routes }) => (
  <Switch>
    {routes.map(({ children, ...pr }) => {
      if (children) {
        return (
          (children || []).map(p => <PrivateRoute exact {...p} key={p.path} />)
        );
      }
      return <PrivateRoute exact {...pr} key={pr.path} />;
    })}
  </Switch>
);

Routes.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string,
    })),
  })).isRequired,
};

export default Routes;
