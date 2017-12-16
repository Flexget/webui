import PropTypes from 'prop-types';

export const ListShape = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  added_on: PropTypes.string,
});
