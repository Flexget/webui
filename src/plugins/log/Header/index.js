import { connect } from 'react-redux';
import actions from 'plugins/log/state/actions';
import Header from './Header';

export function mapStateToProps({ log }) {
  return {
    connected: log.connected,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    start: payload => dispatch(actions.connect.request(payload)),
    stop: () => dispatch(actions.disconnect()),
    clearLogs: () => dispatch(actions.clear()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
export { Header };
