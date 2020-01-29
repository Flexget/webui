import React, { FC } from 'react';
import { useContainer } from 'unstated-next';
import { css } from '@emotion/core';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Theme,
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import SelectField from 'common/inputs/formik/SelectField';
import { TaskContainer } from 'plugins/tasks/hooks';
import { useInjectEntry } from '../hooks/entry';

interface Props {
  entryId?: number;
  open?: boolean;
  onClose: () => void;
}

const errorStyle = (theme: Theme) => css`
  color: ${theme.palette.error.main};
  text-align: center;
`;

interface Values {
  task: string;
}

const InjectEntryDialog: FC<Props> = ({ entryId, onClose, open = false }) => {
  const initialValues: Values = { task: '' };
  const [{ loading, error }, inject] = useInjectEntry(entryId);
  const { tasks } = useContainer(TaskContainer);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Inject {entryId ? 'Entry' : 'Entries'}</DialogTitle>
      <Formik
        initialValues={initialValues}
        onSubmit={async ({ task }, actions) => {
          const resp = await inject(task);
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
              Inject
            </Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
};

export default InjectEntryDialog;
