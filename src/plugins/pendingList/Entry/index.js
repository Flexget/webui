import { connect } from 'react-redux';
import actions from 'plugins/pendingList/state/actions';
import Entry from './Entry';

function mapDispatchToProps(dispatch, { entry }) {
  return {
    approveEntry: () => dispatch(actions.approveEntry.request(entry)),
    removeEntry: () => dispatch(actions.removeEntry.request(entry)),
    rejectEntry: () => dispatch(actions.rejectEntry.request(entry)),
    injectEntry: task => dispatch(actions.injectEntry.request(entry, task)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(Entry);
