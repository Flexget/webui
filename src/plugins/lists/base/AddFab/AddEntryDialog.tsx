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
import { useAddEntry } from '../hooks/entry';
import { usePluginContainer } from '../hooks/api';

interface Props {
  open?: boolean;
  onClose: () => void;
}

const errorStyle = (theme: Theme) => css`
  color: ${theme.palette.error.main};
  text-align: center;
`;

const AddEntryDialog: FC<Props> = ({ open = false, onClose }) => {
  const { addEntryProps } = usePluginContainer();
  const initialValues: Record<string, string> = addEntryProps.reduce(
    (obj, { name }) => ({
      ...obj,
      [name]: '',
    }),
    {},
  );
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
            {addEntryProps.map(({ name, label, type }, index) => (
              <TextField
                key={name}
                id={name}
                label={label}
                fullWidth
                name={name}
                type={type}
                autoFocus={index === 0}
              />
            ))}
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
