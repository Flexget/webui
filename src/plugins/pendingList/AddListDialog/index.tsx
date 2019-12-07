import React, { FC } from 'react';
import { css } from '@emotion/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from 'common/TextField';
import { Formik, Form } from 'formik';
import { AddListRequest } from 'plugins/pendingList/types';
import { useAddList } from 'plugins/pendingList/hooks/list';
import theme from 'theme';

interface Props {
  open: boolean;
  onClose: () => void;
}

const errorStyle = css`
  color: ${theme.palette.error[500]};
  text-align: center;
  padding: 1rem;
`;

const AddListDialog: FC<Props> = ({ open, onClose }) => {
  const initialValues: AddListRequest = { name: '' };
  const [{ loading, error }, addList] = useAddList();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Pending List</DialogTitle>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          const resp = await addList(values);
          if (resp.ok) {
            actions.resetForm();
          }
        }}
      >
        <Form>
          <div css={errorStyle}>{error?.message}</div>
          <DialogContent>
            <TextField autoFocus id="name" label="List Name" fullWidth name="name" />
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

export default AddListDialog;
