import React, { FC } from 'react';
import { css } from '@emotion/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from 'common/TextField';
import { Form, Formik } from 'formik';
import theme from 'theme';
import { useAddEntry } from 'plugins/pendingList/hooks/entry';
import { AddEntryRequest } from '../types';

interface Props {
  open: boolean;
  onClose: () => void;
  setPage: SetState<number>;
}

const errorStyle = css`
  color: ${theme.palette.error[500]};
  text-align: center;
  padding: 1rem;
`;

const AddEntryDialog: FC<Props> = ({ open = false, onClose, setPage }) => {
  const initialValues: AddEntryRequest = { title: '', originalUrl: '' };
  const [{ loading, error }, addEntry] = useAddEntry(setPage);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Entry</DialogTitle>

      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          const resp = await addEntry(values);
          if (resp.ok) {
            actions.resetForm();
          }
        }}
      >
        <Form>
          <div css={errorStyle}>{error?.message}</div>
          <DialogContent>
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
