import React, { FC } from 'react';
import { Formik } from 'formik';
import { Button, Theme, Tabs, Tab, CircularProgress } from '@material-ui/core';
import { useOverlayState } from 'utils/hooks';
import { css } from '@emotion/core';
import { ReadyState } from 'core/api';
import { ExecuteTaskRequest, Phase, TaskExecuteState } from './types';
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

const tabSection = () => css`
  flex-grow: 1;
`;

const infoSection = css`
  text-align: center;
`;

const Execute: FC = () => {
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
                <div>Current Status: {displayProgress?.status}</div>
                <div>
                  Phase: {getDescription(displayProgress?.phase)} - {displayProgress?.plugin}
                </div>
                {summary && (
                  <div>
                    {summary.aborted ? (
                      <>
                        <span>Aborted!!</span>
                        <span>Reason: {summary.abortReason}</span>
                      </>
                    ) : (
                      <>
                        <span>Accepted: {summary.accepted}</span>
                        <span>Rejected: {summary.rejected}</span>
                        <span>Failed: {summary.failed}</span>
                        <span>Undecided: {summary.undecided}</span>
                      </>
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
        <ExecuteDialog readyState={readyState} close={close} open={isOpen} />
      </Formik>
    </>
  );
};

export default Execute;
