import { connect } from 'react-redux';
import { ADD_ENTRY } from 'plugins/pending-list/data/actions';
import { request } from 'utils/actions';
import AddEntryDialog from './AddEntryDialog';

export function mapStateToProps({ status }) {
  return {
    errorStatus: status.error || {},
  };
}

function mapDispatchToProps(dispatch, { onClose, listId }) {
  return {
    onSubmit: entry => new Promise((resolve, reject) => (
      dispatch(request(ADD_ENTRY, { listId, entry, resolve, reject }))
    )),
    onSubmitSuccess: onClose,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEntryDialog);
