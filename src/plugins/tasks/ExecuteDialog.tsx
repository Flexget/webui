import React, { FC, useEffect } from 'react';
import { useContainer } from 'unstated-next';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { Form, useFormikContext, Field } from 'formik';
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

  const { setSubmitting, isSubmitting, resetForm } = useFormikContext<ExecuteTaskRequest>();
  useEffect(() => {
    if (isSubmitting && readyState === ReadyState.Open) {
      resetForm();
      close();
      setSubmitting(false);
    }
  }, [close, isSubmitting, readyState, resetForm, setSubmitting]);

  return (
    <>
      <Button onClick={open} color="primary">
        Execute
      </Button>
      <Dialog open={isOpen} onClose={close} fullWidth maxWidth="xs">
        <DialogTitle>Execute Tasks</DialogTitle>
        <Form>
          <DialogContent>
            <Autocomplete
              multiple
              options={tasks.map(t => t.name)}
              getOptionLabel={option => option}
              filterSelectedOptions
              name="tasks"
              InputProps={{
                label: 'Task(s)',
              }}
            />
            <FormControlLabel
              control={<Field name="noCache" component={Checkbox} />}
              label="No Cache"
            />
            <FormControlLabel
              control={<Field name="disableTracking" component={Checkbox} />}
              label="Disable Tracking"
            />
            <FormControlLabel
              control={<Field name="discoverNow" component={Checkbox} />}
              label="Discover Now"
            />
            <FormControlLabel control={<Field name="learn" component={Checkbox} />} label="Learn" />
            <FormControlLabel control={<Field name="now" component={Checkbox} />} label="Now" />
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
