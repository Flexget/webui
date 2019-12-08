import { createContainer } from 'unstated-next';
import { useState, useEffect } from 'react';
import { useFlexgetAPI } from 'core/api';
import { Task } from './types';

export const enum Constants {
  GET_TASKS = '@flexget/pendingList/GET_TASKS',
}

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [state, request] = useFlexgetAPI<Task[]>('/tasks');

  useEffect(() => {
    const fn = async () => {
      const resp = await request();
      if (resp.ok) {
        setTasks(resp.data);
      }
    };
    fn();
  }, [request]);

  return { ...state, tasks };
};

export const TaskContainer = createContainer(useTasks);
