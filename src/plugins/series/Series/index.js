import { connect } from 'react-redux';
import { hot } from 'react-hot-loader/root';
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

export default hot(connect(mapStateToProps, mapDispatchToProps)(Series));
export { Series };
