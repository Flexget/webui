import PropTypes from 'prop-types';

export const ListShape = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  addedOn: PropTypes.string,
});
