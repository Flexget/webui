import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';

const Loader = ({
  isLoading,
  timedOut,
  pastDelay,
  error,
}) => {
  if (isLoading) {
    // While our other component is loading...
    if (timedOut) {
      // In case we've timed out loading our other component.
      return <div>Loader timed out!</div>;
    } if (pastDelay) {
      // Display a loading screen after a set delay.
      return <CircularProgress />;
    }
    // Don't flash "Loading..." when we don't need to.
    return null;
  }

  if (error) {
    // If we aren't loading, maybe
    return <div>Error! Component failed to load</div>;
  }
  // This case shouldn't happen... but we'll return null anyways.
  return null;
};

Loader.propTypes = {
  isLoading: PropTypes.bool,
  timedOut: PropTypes.bool,
  pastDelay: PropTypes.bool,
  error: PropTypes.object, // eslint-disable-line react/require-default-props
};

Loader.defaultProps = {
  isLoading: false,
  timedOut: false,
  pastDelay: false,
};

export default Loader;
