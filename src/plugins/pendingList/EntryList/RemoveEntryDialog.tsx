import React, { FC, FormEvent } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from '@material-ui/core';
import { css } from '@emotion/core';
import theme from 'core/theme';
import { useRemoveEntry } from '../hooks/entry';

interface Props {
  open?: boolean;
  onClose: () => void;
  entryId?: number;
}

const errorStyle = css`
  color: ${theme.palette.error[500]};
  text-align: center;
`;

const RemoveEntryDialog: FC<Props> = ({ open = false, onClose, entryId }) => {
  const [{ loading, error }, removeEntry] = useRemoveEntry(entryId);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resp = await removeEntry();
    if (resp.ok) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <DialogTitle>Remove Entry</DialogTitle>
        <DialogContent>
          {error && <DialogContentText css={errorStyle}>{error.message}</DialogContentText>}
          <DialogContentText>
            Are you sure you would like to remove {entryId ? 'this entry' : 'these entries'}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} type="button">
            Cancel
          </Button>
          <Button color="primary" disabled={loading} type="submit">
            Remove
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RemoveEntryDialog;
