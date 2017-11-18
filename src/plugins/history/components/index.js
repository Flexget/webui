import { connect } from 'react-redux';
import { request } from 'utils/actions';
import { GET_HISTORY } from 'plugins/history/data/actions';
import History from './History';

function mapDispatchToProps(dispatch) {
  return {
    getHistory: data => dispatch(request(GET_HISTORY, data)),
  };
}

export default connect(null, mapDispatchToProps)(History);
export { History };
