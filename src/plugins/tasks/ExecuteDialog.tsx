import React, { FC, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormControl,
  FormGroup,
  Theme,
  Tooltip,
} from '@material-ui/core';
import { Form, useFormikContext } from 'formik';
import Autocomplete from 'common/inputs/formik/Autocomplete';
import Checkbox from 'common/inputs/formik/Checkbox';
import { ReadyState } from 'core/api';
import { ExecuteTaskRequest, Task } from 'plugins/tasks/types';
import { css } from '@emotion/core';

interface Props {
  readyState: ReadyState;
  open: boolean;
  close: () => void;
  tasks: Task[];
}

const group = css`
  display: flex;
  flex-direction: row;
`;

const control = (theme: Theme) => css`
  margin: ${theme.typography.pxToRem(theme.spacing(2))} 0;
`;

const ExecuteDialog: FC<Props> = ({ readyState, open, close, tasks }) => {
  const { setSubmitting, isSubmitting, resetForm } = useFormikContext<ExecuteTaskRequest>();

  useEffect(() => {
    if (readyState === ReadyState.Open) {
      resetForm();
      setSubmitting(false);
      close();
    }
  }, [close, readyState, resetForm, setSubmitting]);

  return (
    <>
      <Dialog open={open} onClose={close} fullWidth maxWidth="xs">
        <DialogTitle>Execute Tasks</DialogTitle>
        <Form>
          <DialogContent>
            <Autocomplete
              multiple
              options={tasks.map(t => t.name)}
              filterSelectedOptions
              name="tasks"
              InputProps={{
                label: 'Task(s)',
                placeholder: 'Select Tasks',
                fullWidth: true,
                InputLabelProps: {
                  shrink: true,
                },
              }}
            />
            <FormControl css={control}>
              <FormGroup css={group}>
                <Tooltip title="Disable caches. works only in plugins that have explicit support">
                  <FormControlLabel control={<Checkbox name="noCache" />} label="No Cache" />
                </Tooltip>
                <Tooltip title="Disable episode advancement for this run">
                  <FormControlLabel
                    control={<Checkbox name="disableTracking" />}
                    label="Disable Tracking"
                  />
                </Tooltip>
                <Tooltip title="Immediately try to discover everything">
                  <FormControlLabel
                    control={<Checkbox name="discoverNow" />}
                    label="Discover Now"
                  />
                </Tooltip>
                <Tooltip title="Matches are not downloaded but will be skipped in the future">
                  <FormControlLabel control={<Checkbox name="learn" />} label="Learn" />
                </Tooltip>
                <Tooltip title="Run task(s) even if the interval plugin would normally prevent it">
                  <FormControlLabel control={<Checkbox name="now" />} label="Now" />
                </Tooltip>
              </FormGroup>
            </FormControl>
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
