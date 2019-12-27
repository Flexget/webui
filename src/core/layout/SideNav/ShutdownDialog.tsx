import React, { FC } from 'react';
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
import { useServerOperation, ServerOperation } from './hooks';

interface Props {
  open?: boolean;
  onClose: () => void;
}

const errorStyle = (theme: Theme) => css`
  color: ${theme.palette.error[500]};
  text-align: center;
`;

const ShutdownDialog: FC<Props> = ({ open = false, onClose }) => {
  const [{ loading, error }, handleClick] = useServerOperation(ServerOperation.Shutdown, onClose);
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Shutdown</DialogTitle>
      <DialogContent>
        {error && <DialogContentText css={errorStyle}>{error.message}</DialogContentText>}
        <DialogContentText>Are you sure you want to shutdown FlexGet?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} type="button">
          Cancel
        </Button>
        <Button onClick={handleClick} color="primary" disabled={loading}>
          Shutdown
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShutdownDialog;
