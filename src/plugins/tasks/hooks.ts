import { createContainer } from 'unstated-next';
import { useState, useEffect } from 'react';
import { useFlexgetAPI } from 'core/api';
import { Method, snakeCase } from 'utils/fetch';
import { stringify } from 'qs';
import { Task, ExecuteTaskRequest, TaskStatus, TaskStatusOptions } from './types';

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

interface TaskState {
  tasks: TaskStatus[];
  total: number;
}

export const useGetTaskStatus = (options: TaskStatusOptions) => {
  const [tasks, setTasks] = useState<TaskState>({ tasks: [], total: 0 });
  const query = stringify(snakeCase({ ...options, page: options.page + 1 }));
  const [state, request] = useFlexgetAPI<TaskStatus[]>(`/tasks/status?${query}`);

  useEffect(() => {
    const fn = async () => {
      const resp = await request();
      if (resp.ok) {
        setTasks({ tasks: resp.data, total: parseInt(resp.headers.get('total-count') ?? '0', 10) });
      }
    };
    fn();
  }, [request]);

  return { ...state, ...tasks };
};
