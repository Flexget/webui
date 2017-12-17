import PropTypes from 'prop-types';

export const ListShape = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  added_on: PropTypes.string,
});

export const EntryShape = PropTypes.shape({
  id: PropTypes.number,
  added_on: PropTypes.string,
  title: PropTypes.string,
  approved: PropTypes.bool,
  list_id: PropTypes.number,
  original_url: PropTypes.string,
});
