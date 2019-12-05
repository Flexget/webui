import { connect } from 'react-redux';
import actions from '../state/actions';
import History from './History';

function mapDispatchToProps(dispatch) {
  return {
    getHistory: data => dispatch(actions.getHistory.request(data)),
  };
}

export default connect(null, mapDispatchToProps)(History);
export { History };
