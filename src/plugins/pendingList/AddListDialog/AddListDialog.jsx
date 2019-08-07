import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from 'common/TextField';

const AddListDialog = ({ open, onClose, handleSubmit }) => (
  <Dialog open={open} onRequestClose={onClose}>
    <DialogTitle>Add New Pending List</DialogTitle>
    <form onSubmit={handleSubmit}>
      <DialogContent>
        <Field autoFocus id="name" label="List Name" fullWidth name="name" component={TextField} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} type="button">
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
  handleSubmit: PropTypes.func,
};

AddListDialog.defaultProps = {
  open: false,
  handleSubmit: () => {},
};

export default reduxForm({
  form: 'addPendingList',
})(AddListDialog);
