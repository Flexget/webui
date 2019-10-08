import { connect } from 'react-redux';
import StatusBar from 'common/StatusBar';
import actions from 'core/status/state/actions';

export function mapStateToProps({ status }) {
  return {
    open: !!status.error,
    message: status.error && status.error.message,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    clearStatus: () => dispatch(actions.clear()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatusBar);
