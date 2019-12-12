import React, { FC } from 'react';
import { css } from '@emotion/core';
import TextField from 'common/TextField';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import theme from 'theme';
import { useAddEntry } from 'plugins/pendingList/hooks/entry';
import { AddEntryRequest } from '../types';

interface Props {
  open?: boolean;
  onClose: () => void;
}

const errorStyle = css`
  color: ${theme.palette.error[500]};
  text-align: center;
`;

const AddEntryDialog: FC<Props> = ({ open = false, onClose }) => {
  const initialValues: AddEntryRequest = { title: '', originalUrl: '' };
  const [{ loading, error }, addEntry] = useAddEntry();

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Add New Entry</DialogTitle>

      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          const resp = await addEntry(values);
          if (resp.ok) {
            actions.resetForm();
            onClose();
          }
        }}
      >
        <Form>
          <DialogContent>
            {error && <DialogContentText css={errorStyle}>{error.message}</DialogContentText>}
            <TextField autoFocus id="title" label="Entry Title" fullWidth name="title" />
            <TextField id="entry-url" label="Entry URL" fullWidth name="originalUrl" />
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

export default AddEntryDialog;
