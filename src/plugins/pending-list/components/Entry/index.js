import { connect } from 'react-redux';
import { APPROVE_ENTRY, REJECT_ENTRY } from 'plugins/pending-list/data/actions';
import { request } from 'utils/actions';
import Entry from './Entry';

function mapDispatchToProps(dispatch, { entry: { id, list_id } }) {
  return {
    approveEntry: () => dispatch(request(APPROVE_ENTRY, { id, listId: list_id })),
    rejectEntry: () => dispatch(request(REJECT_ENTRY, { id, listId: list_id })),
  };
}

export default connect(null, mapDispatchToProps)(Entry);
