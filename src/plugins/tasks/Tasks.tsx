import React, { FC } from 'react';
import { useInjectPageTitle } from 'core/layout/AppBar/hooks';
import { TaskTable } from './TaskTable';

const Task: FC = () => {
  useInjectPageTitle('Tasks');
  return <TaskTable />;
};

export default Task;
