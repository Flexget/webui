import React from 'react';
import PropTypes from 'prop-types';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import { EntryShape } from 'plugins/pending-list/data/shapes';

const RemoveEntryDialog = ({ entry, onClose, removeEntry }) => (
  <Dialog open={!!entry} onRequestClose={onClose}>
    <DialogTitle>Remove Entry</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you would like to remove this entry?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} type="button">
        Cancel
      </Button>
      <Button onClick={removeEntry} color="primary">
        Remove
      </Button>
    </DialogActions>
  </Dialog>
);

RemoveEntryDialog.propTypes = {
  entry: EntryShape,
  onClose: PropTypes.func.isRequired,
  removeEntry: PropTypes.func.isRequired,
};

RemoveEntryDialog.defaultProps = {
  open: false,
  entry: null,
};

export default RemoveEntryDialog;
