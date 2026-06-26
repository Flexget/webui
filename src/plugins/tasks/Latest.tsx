import React, { FC, useMemo, useState } from 'react';
import { Formik } from 'formik';
import { useHistory, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { FormControlLabel, IconButton, Switch, Tooltip } from '@material-ui/core';
import { CheckCircle, Error, RadioButtonUnchecked, Update } from '@material-ui/icons';
import { useInjectPageTitle } from 'core/layout/AppBar/hooks';
import { Direction } from 'utils/query';
import { useContainer } from 'unstated-next';
import { SortByStatus, TaskStatusOptions } from './types';
import TaskTable from './TaskTable';
import { useGetTaskStatuses, useGetAllExecutedTaskNames, TaskContainer } from './hooks';
import Execute from './Execute';

const headers = [
  {
    id: SortByStatus.Succeeded,
    label: '',
    numeric: true,
  },
  {
    id: SortByStatus.Name,
    label: 'Name',
    sortByField: true,
  },
  {
    id: SortByStatus.LastExecutionTime,
    label: 'Start Time',
    sortByField: true,
  },
  {
    id: SortByStatus.End,
    label: 'End Time',
  },
  {
    id: SortByStatus.Produced,
    label: 'Produced',
    numeric: true,
  },
  {
    id: SortByStatus.Accepted,
    label: 'Accepted',
    numeric: true,
  },
  {
    id: SortByStatus.Rejected,
    label: 'Rejected',
    numeric: true,
  },
  {
    id: SortByStatus.Failed,
    label: 'Failed',
    numeric: true,
  },
  {
    id: SortByStatus.AbortReason,
    label: 'Abort Reason',
  },
  {
    id: SortByStatus.Backfill,
    label: '',
  },
];

const Latest: FC = () => {
  useInjectPageTitle('Tasks - Latest Executions');
  const { push } = useHistory();
  const { url } = useRouteMatch();
  const [showDeleted, setShowDeleted] = useState(false);
  const [options, setOptions] = useState<TaskStatusOptions>({
    page: 0,
    perPage: 10,
    order: Direction.Desc,
    sortBy: SortByStatus.LastExecutionTime,
  });

  const { tasks, total } = useGetTaskStatuses(options);
  const { tasks: configTasks } = useContainer(TaskContainer);
  const allExecutedNames = useGetAllExecutedTaskNames();

  const unexecutedTasks = useMemo(
    () => configTasks.filter(t => !allExecutedNames.has(t.name)),
    [configTasks, allExecutedNames],
  );

  const rows = useMemo(
    (): Array<{
      key: React.Key;
      data: { deleted: boolean; [key: string]: React.ReactNode };
      props?: { onClick?: () => void; hover?: boolean };
    }> => {
    const configNames = new Set(configTasks.map(t => t.name));

    const makeBackfillButton = (name: string) => (
      <Tooltip title="Backfill missing episodes for series in this task">
        <IconButton
          size="small"
          component={Link}
          to={`/backfill?task=${encodeURIComponent(name)}`}
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.stopPropagation()}
        >
          <Update fontSize="small" />
        </IconButton>
      </Tooltip>
    );

    return [
      ...tasks.map(
        ({
          name,
          id,
          lastExecution: {
            start,
            end,
            produced,
            rejected,
            accepted,
            failed,
            succeeded,
            abortReason,
          },
        }) => ({
          key: id,
          data: {
            [SortByStatus.ID]: id as number | undefined,
            [SortByStatus.Name]: name,
            [SortByStatus.LastExecutionTime]: start as string | undefined,
            [SortByStatus.Start]: start as string | undefined,
            [SortByStatus.End]: end as string | undefined,
            [SortByStatus.Produced]: produced as number | undefined,
            [SortByStatus.Rejected]: rejected as number | undefined,
            [SortByStatus.Accepted]: accepted as number | undefined,
            [SortByStatus.Failed]: failed as number | undefined,
            [SortByStatus.AbortReason]: abortReason,
            [SortByStatus.Succeeded]: succeeded ? (
              <CheckCircle fontSize="small" color="primary" />
            ) : (
              <Error fontSize="small" color="error" />
            ),
            [SortByStatus.Backfill]: makeBackfillButton(name),
            deleted: !configNames.has(name),
          },
          props: {
            onClick: () => push(`${url}/${id}`),
            hover: true,
          },
        }),
      ),
      ...unexecutedTasks.map(({ name }) => ({
        key: `unexecuted-${name}`,
        data: {
          [SortByStatus.ID]: undefined,
          [SortByStatus.Name]: name,
          [SortByStatus.LastExecutionTime]: undefined,
          [SortByStatus.Start]: undefined,
          [SortByStatus.End]: undefined,
          [SortByStatus.Produced]: undefined,
          [SortByStatus.Rejected]: undefined,
          [SortByStatus.Accepted]: undefined,
          [SortByStatus.Failed]: undefined,
          [SortByStatus.AbortReason]: undefined,
          [SortByStatus.Succeeded]: <RadioButtonUnchecked fontSize="small" color="disabled" />,
          [SortByStatus.Backfill]: makeBackfillButton(name),
          deleted: false,
        },
      })),
    ];
  }, [push, tasks, unexecutedTasks, url, configTasks]);

  const visibleRows = useMemo(
    () => (showDeleted ? rows : rows.filter(r => !r.data.deleted)),
    [rows, showDeleted],
  );

  return (
    <>
      <Formik initialValues={options} onSubmit={setOptions}>
        <TaskTable total={total} rows={visibleRows} headers={headers} />
      </Formik>
      <Execute
        tasks={configTasks}
        leftContent={
          <FormControlLabel
            control={
              <Switch
                checked={showDeleted}
                onChange={e => setShowDeleted(e.target.checked)}
                color="primary"
              />
            }
            label="Show Deleted"
          />
        }
      />
    </>
  );
};

export default Latest;
