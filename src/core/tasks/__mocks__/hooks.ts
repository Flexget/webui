import { useState } from 'react';
import { createContainer } from 'unstated-next';
import { Task } from '../types';

export const TaskContainer = createContainer(() => {
  const [tasks] = useState<Task[]>([{ name: 'task1' }, { name: 'task2' }]);
  return { loading: false, tasks };
});

export const { useExecuteTask } = jest.requireActual('../hooks');
