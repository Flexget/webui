import React, { FC } from 'react';
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
import { useContainer } from 'unstated-next';
import { useRemoveList, ListContainer } from './hooks/list';

interface Props {
  open?: boolean;
  onClose: () => void;
}

const errorStyle = css`
  color: ${theme.palette.error[500]};
  text-align: center;
`;

const RemoveListDialog: FC<Props> = ({ open = false, onClose }) => {
  const [{ listId }] = useContainer(ListContainer);
  const [{ loading, error }, removeList] = useRemoveList(listId);
  const handleClick = async () => {
    const resp = await removeList();
    if (resp.ok) {
      onClose();
    }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Remove Entry</DialogTitle>
      <DialogContent>
        {error && <DialogContentText css={errorStyle}>{error.message}</DialogContentText>}
        <DialogContentText>Are you sure you would like to remove this List?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} type="button">
          Cancel
        </Button>
        <Button onClick={handleClick} color="primary" disabled={loading}>
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveListDialog;
