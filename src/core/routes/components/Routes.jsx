import React from 'react';
import PropTypes from 'prop-types';
import PrivateRoute from './PrivateRoute';

const Routes = ({ routes }) => routes.map(props => (
  <PrivateRoute exact {...props} key={props.path} />
));

Routes.propTypes = {
  path: PropTypes.string.isRequired,
};

export default Routes;
