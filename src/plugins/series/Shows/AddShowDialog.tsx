import { FC } from 'react';
import { css } from '@emotion/react';
import TextField from 'common/inputs/formik/TextField';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Theme,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { dialogFields } from 'common/styles';
import { useAddShow } from '../hooks/shows';
import { ShowRequest } from '../types';

interface Props {
  open?: boolean;
  onClose: () => void;
}

const errorStyle = (theme: Theme) => css`
  color: ${theme.palette.error.main};
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
          <DialogContent css={dialogFields}>
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
