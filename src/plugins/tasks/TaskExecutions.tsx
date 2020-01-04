import React, { FC } from 'react';
import { useInjectPageTitle } from 'core/layout/AppBar/hooks';

const TaskExecutions: FC = () => {
  useInjectPageTitle('Tasks - Latest Executions');
  return <div />;
};

export default TaskExecutions;
