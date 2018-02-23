import { connect } from 'react-redux';
import { GET_ENTRIES } from 'plugins/pending-list/data/actions';
import { request } from 'utils/actions';
import Pagination from './Pagination';

function mapStateToProps({ pendingList }) {
  return {
    entries: pendingList.entries,
  };
}

function mapDispatchToProps(dispatch, { listId }) {
  return {
    getEntries: params => listId && dispatch(request(GET_ENTRIES, { listId, params })),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
