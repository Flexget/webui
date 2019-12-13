import React from 'react';
import PropTypes from 'prop-types';
import { Spinner, Wrapper } from './styles';

const LoadingSpinner = ({ loading }) => {
  if (loading) {
    return (
      <Wrapper>
        <Spinner />
      </Wrapper>
    );
  }
  return null;
};

LoadingSpinner.propTypes = {
  loading: PropTypes.bool,
};

LoadingSpinner.defaultProps = {
  loading: false,
};

export default LoadingSpinner;
