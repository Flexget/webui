import React, { FC, useMemo, useState } from 'react';
import { Formik } from 'formik';
import { useHistory, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { IconButton, Tooltip } from '@material-ui/core';
import { CheckCircle, Error, Update } from '@material-ui/icons';
import { useInjectPageTitle } from 'core/layout/AppBar/hooks';
import { Direction } from 'utils/query';
import { useContainer } from 'unstated-next';
import { SortByStatus, TaskStatusOptions } from './types';
import TaskTable from './TaskTable';
import { useGetTaskStatuses, TaskContainer } from './hooks';
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
  const [options, setOptions] = useState<TaskStatusOptions>({
    page: 0,
    perPage: 10,
    order: Direction.Desc,
    sortBy: SortByStatus.LastExecutionTime,
  });

  const { tasks, total } = useGetTaskStatuses(options);
  const { tasks: configTasks } = useContainer(TaskContainer);
  const rows = useMemo(
    () =>
      tasks.map(
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
            [SortByStatus.ID]: id,
            [SortByStatus.Name]: name,
            [SortByStatus.LastExecutionTime]: start,
            [SortByStatus.Start]: start,
            [SortByStatus.End]: end,
            [SortByStatus.Produced]: produced,
            [SortByStatus.Rejected]: rejected,
            [SortByStatus.Accepted]: accepted,
            [SortByStatus.Failed]: failed,
            [SortByStatus.AbortReason]: abortReason,
            [SortByStatus.Succeeded]: succeeded ? (
              <CheckCircle fontSize="small" color="primary" />
            ) : (
              <Error fontSize="small" color="error" />
            ),
            [SortByStatus.Backfill]: (
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
            ),
          },
          props: {
            onClick: () => push(`${url}/${id}`),
            hover: true,
          },
        }),
      ),
    [push, tasks, url],
  );

  return (
    <>
      <Formik initialValues={options} onSubmit={setOptions}>
        <TaskTable total={total} rows={rows} headers={headers} />
      </Formik>
      <Execute tasks={configTasks} />
    </>
  );
};

export default Latest;
