import { connect } from 'react-redux';
import { request } from 'utils/actions';
import { ADD_LIST } from '../state/actions';
import AddListDialog from './AddListDialog';

export function mapStateToProps({ status }) {
  return {
    errorStatus: status.error || {},
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onSubmit: data => new Promise((resolve, reject) => (
      dispatch(request(ADD_LIST, { data, resolve, reject }))
    )),
    onSubmitSuccess: ownProps.onClose,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddListDialog);
