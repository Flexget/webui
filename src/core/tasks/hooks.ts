import { createContainer } from 'unstated-next';
import { useState, useEffect } from 'react';
import { useFlexgetAPI } from 'core/api';
import { Method } from 'utils/fetch';
import { Task, ExecuteTaskRequest } from './types';

export const enum Constants {
  GET_TASKS = '@flexget/pendingList/GET_TASKS',
}

export const TaskContainer = createContainer(() => {
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
});

export const useExecuteTask = () => {
  const [state, request] = useFlexgetAPI('/tasks/execute', Method.Post);

  return [state, (req: ExecuteTaskRequest) => request(req)] as const;
};
