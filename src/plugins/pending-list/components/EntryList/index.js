import { connect } from 'react-redux';
import { GET_ENTRIES } from 'plugins/pending-list/data/actions';
import { request } from 'utils/actions';
import EntryList from './EntryList';

function mapStateToProps({ pendingList }) {
  return {
    entries: pendingList.entries,
  };
}

function mapDispatchToProps(dispatch, { listId }) {
  return {
    getEntries: () => listId && dispatch(request(GET_ENTRIES, { listId })),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryList);
