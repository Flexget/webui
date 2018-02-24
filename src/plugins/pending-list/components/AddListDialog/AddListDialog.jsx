import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'common/TextField';

const AddListDialog = ({ open, onClose, handleSubmit }) => (
  <Dialog open={open} onRequestClose={onClose}>
    <DialogTitle>Add New Pending List</DialogTitle>
    <form onSubmit={handleSubmit}>
      <DialogContent>
        <Field
          autoFocus
          id="name"
          label="List Name"
          fullWidth
          name="name"
          component={TextField}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="button">
          Cancel
        </Button>
        <Button variant="submit" color="primary">
          Add
        </Button>
      </DialogActions>
    </form>
  </Dialog>
);

AddListDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

AddListDialog.defaultProps = {
  open: false,
};

export default reduxForm({
  form: 'addPendingList',
})(AddListDialog);
