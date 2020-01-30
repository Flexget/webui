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
  FormControl,
  FormLabel,
  FormGroup,
  Theme,
  Tooltip,
} from '@material-ui/core';
import { Form, useFormikContext, Field } from 'formik';
import Autocomplete from 'common/inputs/formik/Autocomplete';
import { TaskContainer } from 'plugins/tasks/hooks';
import { ReadyState } from 'core/api';
import { ExecuteTaskRequest } from 'plugins/tasks/types';
import { css } from '@emotion/core';

interface Props {
  readyState: ReadyState;
  open: boolean;
  close: () => void;
}

const group = css`
  display: flex;
  flex-direction: row;
`;

const control = (theme: Theme) => css`
  margin: ${theme.typography.pxToRem(theme.spacing(2))} 0;
`;

const ExecuteDialog: FC<Props> = ({ readyState, open, close }) => {
  const { tasks } = useContainer(TaskContainer);

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
                  <FormControlLabel
                    control={<Field name="noCache" component={Checkbox} />}
                    label="No Cache"
                  />
                </Tooltip>
                <Tooltip title="Disable episode advancement for this run">
                  <FormControlLabel
                    control={<Field name="disableTracking" component={Checkbox} />}
                    label="Disable Tracking"
                  />
                </Tooltip>
                <Tooltip title="Immediately try to discover everything">
                  <FormControlLabel
                    control={<Field name="discoverNow" component={Checkbox} />}
                    label="Discover Now"
                  />
                </Tooltip>
                <Tooltip title="Matches are not downloaded but will be skipped in the future">
                  <FormControlLabel
                    control={<Field name="learn" component={Checkbox} />}
                    label="Learn"
                  />
                </Tooltip>
                <Tooltip title="Run task(s) even if the interval plugin would normally prevent it">
                  <FormControlLabel
                    control={<Field name="now" component={Checkbox} />}
                    label="Now"
                  />
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
