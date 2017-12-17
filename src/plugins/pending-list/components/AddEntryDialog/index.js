import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { ADD_ENTRY } from 'plugins/pending-list/data/actions';
import { request } from 'utils/actions';
import AddEntryDialog from './AddEntryDialog';

function mapDispatchToProps(dispatch, { onClose, listId }) {
  return {
    onSubmit: entry => new Promise((resolve, reject) => (
      dispatch(request(ADD_ENTRY, { listId, entry, resolve, reject }))
    )),
    onSubmitSuccess: () => {
      onClose();
      dispatch(reset('addEntry'));
    },
    onClose: () => {
      onClose();
      dispatch(reset('addEntry'));
    },
  };
}

export default connect(null, mapDispatchToProps)(AddEntryDialog);
