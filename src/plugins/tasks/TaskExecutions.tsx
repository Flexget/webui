import React, { FC, useCallback, useState, useMemo } from 'react';
import { useHistory, useParams } from 'react-router';
import { ArrowBackIos, CheckCircle, Error } from '@material-ui/icons';
import { useInjectPageTitle, useSetAppBarIcon } from 'core/layout/AppBar/hooks';
import { useGetTask, useGetTaskExecutions } from 'plugins/tasks/hooks';
import { Direction } from 'utils/query';
import { TaskExecutionOptions, SortByStatus } from 'plugins/tasks/types';
import { Formik } from 'formik';
import TaskTable from 'plugins/tasks/TaskTable';

interface Match {
  taskId: string;
}

const headers = [
  {
    id: SortByStatus.Succeeded,
    label: '',
    numeric: true,
    sortByField: true,
  },
  {
    id: SortByStatus.Start,
    label: 'Start Time',
    sortByField: true,
  },
  {
    id: SortByStatus.End,
    label: 'End Time',
    sortByField: true,
  },
  {
    id: SortByStatus.Produced,
    label: 'Produced',
    numeric: true,
    sortByField: true,
  },
  {
    id: SortByStatus.Accepted,
    label: 'Accepted',
    numeric: true,
    sortByField: true,
  },
  {
    id: SortByStatus.Rejected,
    label: 'Rejected',
    numeric: true,
    sortByField: true,
  },
  {
    id: SortByStatus.Failed,
    label: 'Failed',
    numeric: true,
    sortByField: true,
  },
  {
    id: SortByStatus.AbortReason,
    label: 'Abort Reason',
  },
];

const TaskExecutions: FC = () => {
  const taskId = parseInt(useParams<Match>().taskId, 10);
  const [options, setOptions] = useState<TaskExecutionOptions>({
    page: 0,
    perPage: 10,
    order: Direction.Desc,
    sortBy: SortByStatus.Start,
    succeeded: false,
  });
  const { task } = useGetTask(taskId);
  const { executions, total } = useGetTaskExecutions(taskId, options);

  const { push } = useHistory();

  const onClick = useCallback(() => {
    push('/tasks');
  }, [push]);

  const icon = useMemo(
    () => ({
      Component: ArrowBackIos,
      onClick,
      label: 'go back',
    }),
    [onClick],
  );

  const name = task?.name;

  useSetAppBarIcon(icon);
  useInjectPageTitle(name ? `${name} - Task Executions` : 'Task Executions');

  const rows = useMemo(
    () =>
      executions.map(
        ({ id, start, end, produced, rejected, accepted, failed, succeeded, abortReason }) => ({
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
          },
        }),
      ),
    [executions, name],
  );

  return (
    <Formik initialValues={options} onSubmit={setOptions}>
      <TaskTable total={total} rows={rows} headers={headers} />
    </Formik>
  );
};

export default TaskExecutions;
