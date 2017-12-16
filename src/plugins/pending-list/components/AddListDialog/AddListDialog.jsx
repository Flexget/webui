import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'components/TextField';

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
        <Button onClick={this.onClose} type="button">
          Cancel
        </Button>
        <Button type="submit" color="primary">
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
