import React, { FC } from 'react';
import { css } from '@emotion/core';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import theme from 'theme';
import { RawEntry } from 'core/entry/types';
import SelectField from 'common/TextField/Select';
import { TaskContainer } from 'core/tasks/hooks';
import { InjectRequest } from '../types';
import { useInjectEntry } from '../hooks/entry';

interface Props {
  entry?: RawEntry;
  onClose: () => void;
}

const errorStyle = css`
  color: ${theme.palette.error[500]};
  text-align: center;
`;

const formatEntry = (entry?: RawEntry) => {
  if (entry) {
    const { id, title, originalUrl, ...fields } = entry;
    return { title, url: originalUrl, fields };
  }
  return { title: '', url: '', fields: {} };
};

const InjectEntryDialog: FC<Props> = ({ entry, onClose }) => {
  const initialValues: InjectRequest = { task: '', entry: formatEntry(entry) };
  const [{ loading, error }, inject] = useInjectEntry(entry?.id);
  const open = !!entry;
  const { tasks } = TaskContainer.useContainer();

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Inject Entry</DialogTitle>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          const resp = await inject(values);
          if (resp.ok) {
            actions.resetForm();
            onClose();
          }
        }}
      >
        <Form>
          <DialogContent>
            {error && <DialogContentText css={errorStyle}>{error.message}</DialogContentText>}
            <SelectField
              autoFocus
              id="task"
              label="Task Name"
              fullWidth
              name="task"
              options={tasks.map(({ name }) => ({ value: name, label: name }))}
            />
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

export default InjectEntryDialog;
