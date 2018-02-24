import React from 'react';
import PropTypes from 'prop-types';
import { LinearProgress } from 'material-ui/Progress';

const LoadingBar = ({ loading }) => {
  if (loading) {
    return (
      <LinearProgress
        variant="query"
        color="secondary"
      />
    );
  }
  return null;
};

LoadingBar.propTypes = {
  loading: PropTypes.bool,
};

LoadingBar.defaultProps = {
  loading: false,
};

export default LoadingBar;
