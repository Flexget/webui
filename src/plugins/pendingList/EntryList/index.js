import { connect } from 'react-redux';
import taskActions from 'core/tasks/state/actions';
import actions from 'plugins/pendingList/state/actions';
import EntryList from './EntryList';

function mapStateToProps({ pendingList }) {
  return {
    entries: pendingList.entries,
    listId: pendingList.selected,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getTasks: () => dispatch(taskActions.getTasks.request()),
    getEntries: (listId, params) => dispatch(actions.getEntries.request(listId, params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryList);
