import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { ADD_LIST } from 'plugins/pending-list/data/actions';
import { request } from 'utils/actions';
import AddListDialog from './AddListDialog';

function mapDispatchToProps(dispatch, { onClose }) {
  return {
    onSubmit: data => new Promise((resolve, reject) => (
      dispatch(request(ADD_LIST, { data, resolve, reject }))
    )),
    onSubmitSuccess: () => {
      onClose();
      dispatch(reset('addPendingList'));
    },
    onClose: () => {
      onClose();
      dispatch(reset('addPendingList'));
    },
  };
}

export default connect(null, mapDispatchToProps)(AddListDialog);
