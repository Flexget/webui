import { connect } from 'react-redux';
import actions from '../state/shows/actions';
import Series from './Series';

export function mapStateToProps({ series }) {
  return {
    shows: series.shows.items,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getShows: payload => dispatch(actions.getShows.request(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Series);
export { Series };
