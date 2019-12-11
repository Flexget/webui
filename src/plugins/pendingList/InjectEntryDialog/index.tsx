import React, { FC } from 'react';
import { css } from '@emotion/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { Formik, Form } from 'formik';
import theme from 'theme';
import { RawEntry } from 'common/Entry/types';
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
  padding: 1rem;
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
    <Dialog open={open} onClose={onClose}>
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
          <div css={errorStyle}>{error?.message}</div>
          <DialogContent>
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
