import React, { FC } from 'react';
import { Formik } from 'formik';
import { Button, Theme, Tabs, Tab, CircularProgress, Typography } from '@material-ui/core';
import { useOverlayState } from 'utils/hooks';
import { css } from '@emotion/core';
import { ReadyState } from 'core/api';
import { ExecuteTaskRequest, Phase, TaskExecuteState, Task } from './types';
import { useExecuteTaskStream } from './hooks';
import ExecuteDialog from './ExecuteDialog';

const initialValues: ExecuteTaskRequest = {
  tasks: [],
  progress: true,
  summary: true,
  entryDump: true,
};

const phaseDescriptions = {
  [Phase.Input]: 'Gathering Entries',
  [Phase.Metainfo]: 'Figuring out meta data',
  [Phase.Filter]: 'Filtering Entries',
  [Phase.Download]: 'Downloading Accepted Entries',
  [Phase.Modify]: 'Modifying Entries',
  [Phase.Output]: 'Executing Outputs',
  [Phase.Exit]: 'Finished',
};

const getDescription = (phase?: string) =>
  phase && phase in phaseDescriptions ? phaseDescriptions[phase] : 'Processing';

const executeWrapper = (theme: Theme) => css`
  display: flex;
  margin-top: ${theme.typography.pxToRem(theme.spacing(2))};
`;

const tabSection = css`
  flex-grow: 1;
`;

const infoSection = css`
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
`;

const list = css`
  display: flex;
  max-width: 500px;
`;

const listItem = (theme: Theme) => css`
  margin-right: ${theme.typography.pxToRem(theme.spacing(2))};
  &:last-child {
    margin-right: 0;
  }
`;

interface Props {
  tasks: Task[];
}

const Execute: FC<Props> = ({ tasks: taskStatuses }) => {
  const [
    {
      state: { tasks, selectedTask },
      readyState,
    },
    { execute, setTask },
  ] = useExecuteTaskStream();
  const [isOpen, { open, close }] = useOverlayState();
  const { progress, summary }: Partial<TaskExecuteState> = selectedTask
    ? tasks[selectedTask]
    : { progress: [] };
  const displayProgress = progress.length > 0 ? progress[0] : undefined;

  return (
    <>
      <div css={executeWrapper}>
        <div css={tabSection}>
          {readyState === ReadyState.Open && (
            <>
              <Tabs
                value={selectedTask}
                onChange={setTask}
                aria-label="Task Tabs"
                variant="scrollable"
                scrollButtons="on"
              >
                {Object.values(tasks).map(({ id, name }) => (
                  <Tab key={id} value={id} fullWidth wrapped label={name} />
                ))}
              </Tabs>
              <div css={infoSection}>
                <CircularProgress variant="determinate" value={displayProgress?.percent ?? 0} />
                <Typography>Current Status: {displayProgress?.status}</Typography>
                <Typography>
                  Phase: {getDescription(displayProgress?.phase)} - {displayProgress?.plugin}
                </Typography>
                {summary && (
                  <div>
                    {summary.aborted ? (
                      <>
                        <Typography>Aborted!!</Typography>
                        <Typography>Reason: {summary.abortReason}</Typography>
                      </>
                    ) : (
                      <div css={list}>
                        <div css={listItem}>
                          <Typography variant="body2">Accepted: {summary.accepted}</Typography>
                        </div>
                        <div css={listItem}>
                          <Typography variant="body2">Rejected: {summary.rejected}</Typography>
                        </div>
                        <div css={listItem}>
                          <Typography variant="body2">Failed: {summary.failed}</Typography>
                        </div>
                        <div css={listItem}>
                          <Typography variant="body2">Undecided: {summary.undecided}</Typography>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div>
          <Button onClick={open} color="primary" variant="contained">
            Execute
          </Button>
        </div>
      </div>
      <Formik initialValues={initialValues} onSubmit={value => execute(value)}>
        <ExecuteDialog readyState={readyState} close={close} open={isOpen} tasks={taskStatuses} />
      </Formik>
    </>
  );
};

export default Execute;
