import { connect } from 'react-redux';
import { APPROVE_ENTRY, REJECT_ENTRY, REMOVE_ENTRY } from 'plugins/pending-list/data/actions';
import { request } from 'utils/actions';
import Entry from './Entry';

function mapDispatchToProps(dispatch, { entry }) {
  return {
    approveEntry: () => dispatch(request(APPROVE_ENTRY, { entry })),
    removeEntry: () => dispatch(request(REMOVE_ENTRY, { entry })),
    rejectEntry: () => dispatch(request(REJECT_ENTRY, { entry })),
  };
}

export default connect(null, mapDispatchToProps)(Entry);
