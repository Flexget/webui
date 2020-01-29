import React, { FC, useEffect } from 'react';
import { useContainer } from 'unstated-next';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { Form, useFormikContext } from 'formik';
import Autocomplete from 'common/inputs/formik/Autocomplete';
import { TaskContainer } from 'plugins/tasks/hooks';
import { useOverlayState } from 'utils/hooks';
import { ReadyState } from 'core/api';
import { ExecuteTaskRequest } from 'plugins/tasks/types';

interface Props {
  readyState: ReadyState;
}

const ExecuteDialog: FC<Props> = ({ readyState }) => {
  const { tasks } = useContainer(TaskContainer);
  const [isOpen, { open, close }] = useOverlayState();

  const { isSubmitting, resetForm } = useFormikContext<ExecuteTaskRequest>();
  useEffect(() => {
    if (isSubmitting && readyState === ReadyState.Open) {
      resetForm();
      close();
    }
  }, [close, isSubmitting, readyState, resetForm]);

  return (
    <>
      <Button onClick={open}>Execute</Button>
      <Dialog open={isOpen} onClose={close} fullWidth maxWidth="xs">
        <DialogTitle>Execute Tasks</DialogTitle>
        <Form>
          <DialogContent>
            <Autocomplete
              multiple
              options={tasks}
              getOptionLabel={option => option}
              filterSelectedOptions
              name="tasks"
              InputProps={{
                label: 'Task(s)',
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={close} type="button">
              Cancel
            </Button>
            <Button type="submit" color="primary" disabled={isSubmitting}>
              Execute
            </Button>
          </DialogActions>
        </Form>
      </Dialog>
    </>
  );
};

export default ExecuteDialog;
