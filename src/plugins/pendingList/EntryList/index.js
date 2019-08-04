import { connect } from 'react-redux';
import { GET_TASKS } from 'core/tasks/state/actions';
import { GET_ENTRIES } from 'plugins/pendingList/state/actions';
import { request } from 'utils/actions';
import EntryList from './EntryList';

function mapStateToProps({ pendingList }) {
  return {
    entries: pendingList.entries,
  };
}

function mapDispatchToProps(dispatch, { listId }) {
  return {
    getTasks: () => dispatch(request(GET_TASKS)),
    getEntries: params => listId && dispatch(request(GET_ENTRIES, { listId, params })),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryList);
