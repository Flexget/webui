
import { connect } from 'react-redux';
import { REMOVE_ENTRY } from 'plugins/pending-list/data/actions';
import { request } from 'utils/actions';
import RemoveEntryDialog from './RemoveEntryDialog';

function mapDispatchToProps(dispatch, { onClose, entry }) {
  return {
    removeEntry: () => (new Promise((resolve, reject) => (
      dispatch(request(REMOVE_ENTRY, {
        id: entry.id,
        listId: entry.list_id,
        resolve,
        reject,
      }))
    ))).then(onClose),
  };
}

export default connect(null, mapDispatchToProps)(RemoveEntryDialog);
