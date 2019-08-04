import PropTypes from 'prop-types';

export const LogShape = PropTypes.shape({
  timestamp: PropTypes.string,
  message: PropTypes.string,
  task: PropTypes.string,
  logLevel: PropTypes.string,
  plugin: PropTypes.string,
});
