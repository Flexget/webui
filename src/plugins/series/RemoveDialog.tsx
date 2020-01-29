import React, { FC, FormEvent, useCallback } from 'react';
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
import { RequestState, APIRequest } from 'core/api';

interface Props {
  state: RequestState;
  request: APIRequest;
  open?: boolean;
  onClose: () => void;
  name: string;
}

const errorStyle = (theme: Theme) => css`
  color: ${theme.palette.error.main};
  text-align: center;
`;

const RemoveDialog: FC<Props> = ({
  open = false,
  onClose,
  request,
  state: { error, loading },
  name,
}) => {
  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const resp = await request();
      if (resp.ok) {
        onClose();
      }
    },
    [onClose, request],
  );
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <DialogTitle>Remove {name}</DialogTitle>
        <DialogContent>
          {error && <DialogContentText css={errorStyle}>{error.message}</DialogContentText>}
          <DialogContentText>Are you sure you would like to remove this {name}?</DialogContentText>
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

export default RemoveDialog;
