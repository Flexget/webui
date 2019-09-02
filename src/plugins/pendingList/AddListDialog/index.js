import { connect } from 'react-redux';
import { reset } from 'redux-form';
import actions from '../state/actions';
import AddListDialog from './AddListDialog';

function mapDispatchToProps(dispatch, { onClose }) {
  return {
    onSubmit: data =>
      new Promise((resolve, reject) =>
        dispatch(actions.addList.request({ data, resolve, reject })),
      ),
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

export default connect(
  null,
  mapDispatchToProps,
)(AddListDialog);
