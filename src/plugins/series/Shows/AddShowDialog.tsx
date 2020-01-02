import React, { FC } from 'react';
import { css } from '@emotion/core';
import TextField from 'common/inputs/formik/TextField';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Theme,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import { useAddShow } from '../hooks/shows';
import { ShowRequest } from '../types';

interface Props {
  open?: boolean;
  onClose: () => void;
}

const errorStyle = (theme: Theme) => css`
  color: ${theme.palette.error[500]};
  text-align: center;
`;

const AddShowDialog: FC<Props> = ({ open = false, onClose }) => {
  const initialValues: ShowRequest = {
    beginEpisode: '',
    name: '',
  };
  const [{ loading, error }, addShow] = useAddShow();

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Add New Show</DialogTitle>

      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          const resp = await addShow(values);
          if (resp.ok) {
            actions.resetForm();
            onClose();
          }
        }}
      >
        <Form>
          <DialogContent>
            {error && <DialogContentText css={errorStyle}>{error.message}</DialogContentText>}
            <TextField id="name" label="Name" fullWidth name="name" autoFocus />
            <TextField id="beginEpisode" label="Begin Episode" fullWidth name="beginEpisode" />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit" color="primary" disabled={loading}>
              Add
            </Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
};

export default AddShowDialog;
