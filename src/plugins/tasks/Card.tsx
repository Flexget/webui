import React, { FC } from 'react';
import { CardContent, Typography } from '@material-ui/core';
import LoadingSpinner from 'common/LoadingSpinner';
import { SortByStatus } from './types';
import { useGetTaskStatuses, useGetTaskQueue } from './hooks';

const Card: FC = () => {
  const { loading: statusLoading, tasks: taskStatuses } = useGetTaskStatuses({
    sortBy: SortByStatus.LastExecutionTime,
    perPage: 1,
  });

  const { loading: queueLoading, tasks: taskQueue } = useGetTaskQueue();

  const loading = statusLoading || queueLoading;

  return (
    <CardContent>
      <LoadingSpinner loading={loading}>
        <Typography>{taskQueue.length} in Queue</Typography>
        {!!taskQueue.length && (
          <Typography>
            <b>Currently Executing</b>: {taskQueue[0].name}
          </Typography>
        )}
        {!!taskStatuses.length && (
          <Typography>
            <b>Last Task Execution</b>: {taskStatuses[0].name} (
            {new Date(taskStatuses[0].lastExecutionTime).toLocaleString()})
          </Typography>
        )}
      </LoadingSpinner>
    </CardContent>
  );
};

export default Card;
