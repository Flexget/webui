import React, { FC, FormEvent } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Theme,
} from '@material-ui/core';
import { css } from '@emotion/core';
import { useRemoveList } from './hooks/list';

interface Props {
  open?: boolean;
  onClose: () => void;
}

const errorStyle = (theme: Theme) => css`
  color: ${theme.palette.error.main};
  text-align: center;
`;

const RemoveListDialog: FC<Props> = ({ open = false, onClose }) => {
  const [{ loading, error }, removeList] = useRemoveList();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resp = await removeList();
    if (resp.ok) {
      onClose();
    }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <DialogTitle>Remove List</DialogTitle>
        <DialogContent>
          {error && <DialogContentText css={errorStyle}>{error.message}</DialogContentText>}
          <DialogContentText>Are you sure you would like to remove this List?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit" color="primary" disabled={loading}>
            Remove
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RemoveListDialog;
