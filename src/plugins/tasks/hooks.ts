import { Reducer, useCallback, useEffect, useState, useReducer, ChangeEvent } from 'react';
import { stringify } from 'qs';
import { createContainer } from 'unstated-next';
import { useFlexgetAPI, useFlexgetStream } from 'core/api';
import { Method, snakeCase, camelize } from 'utils/fetch';
import { action } from 'utils/hooks/actions';
import {
  EntryDumpEvent,
  EventTypes,
  ExecuteTaskRequest,
  Execution,
  ProgressEvent,
  TasksEvent,
  SummaryEvent,
  Task,
  TaskExecutionOptions,
  TaskStatus,
  TaskStatusOptions,
  TaskExecuteState,
} from './types';

export const enum Constants {
  GET_TASKS = '@flexget/tasks/GET_TASKS',
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
  const [state, requestFn] = useFlexgetAPI('/tasks/execute', Method.Post);

  const request = useCallback((req: ExecuteTaskRequest) => requestFn(req), [requestFn]);

  return [state, request] as const;
};

interface TaskState {
  tasks: TaskStatus[];
  total: number;
}

export const useGetTaskStatuses = (options: TaskStatusOptions) => {
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

export const useGetTask = (id: number) => {
  const [task, setTask] = useState<TaskStatus>();
  const [state, request] = useFlexgetAPI<TaskStatus>(`/tasks/status/${id}`);

  useEffect(() => {
    const fn = async () => {
      const resp = await request();
      if (resp.ok) {
        setTask(resp.data);
      }
    };
    fn();
  }, [request]);

  return { ...state, task };
};

interface ExecutionState {
  executions: Execution[];
  total: number;
}

export const useGetTaskExecutions = (id: number, options: TaskExecutionOptions) => {
  const [executions, setExecutions] = useState<ExecutionState>({ executions: [], total: 0 });
  const query = stringify(snakeCase({ ...options, page: options.page + 1 }));
  const [state, request] = useFlexgetAPI<Execution[]>(`/tasks/status/${id}/executions?${query}`);

  useEffect(() => {
    const fn = async () => {
      const resp = await request();
      if (resp.ok) {
        setExecutions({
          executions: resp.data,
          total: parseInt(resp.headers.get('total-count') ?? '0', 10),
        });
      }
    };
    fn();
  }, [request]);

  return { ...state, ...executions };
};

const actions = {
  tasks: (e: TasksEvent) => action(EventTypes.Tasks, e),
  progress: (e: ProgressEvent) => action(EventTypes.Progress, e),
  entryDump: (e: EntryDumpEvent) => action(EventTypes.EntryDump, e),
  summary: (e: SummaryEvent) => action(EventTypes.Summary, e),
  clear: () => action(EventTypes.Clear),
  setTask: (id: number) => action(EventTypes.SetTask, id),
};

type Actions = PropReturnType<typeof actions>;

interface ExecuteState {
  tasks: Record<number, TaskExecuteState>;
  selectedTask?: number;
}

const taskReducer: Reducer<ExecuteState, Actions> = (state, act) => {
  switch (act.type) {
    case EventTypes.Tasks:
      return {
        tasks: act.payload.tasks.reduce(
          (ts, task) => ({
            ...ts,
            [task.id]: {
              ...task,
              progress: [],
            },
          }),
          {},
        ),
        selectedTask: act.payload.tasks[0].id,
      };
    case EventTypes.Progress: {
      const e = act.payload;
      const task = state.tasks[e.taskId];
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [task.id]: {
            ...task,
            progress: [e.progress, ...task.progress],
          },
        },
      };
    }
    case EventTypes.EntryDump: {
      const e = act.payload;
      const task = state.tasks[e.taskId];
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [task.id]: {
            ...task,
            entries: e.entryDump,
          },
        },
      };
    }
    case EventTypes.Summary: {
      const e = act.payload;
      const task = state[e.taskId];
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [task.id]: {
            ...task,
            summary: e.summary,
          },
        },
      };
    }
    case EventTypes.SetTask:
      return {
        ...state,
        selectedTask: act.payload,
      };
    case EventTypes.Clear:
      return {
        tasks: {},
      };
    default:
      return state;
  }
};

export const useExecuteTaskStream = () => {
  const [{ readyState, stream }, { connect, disconnect }] = useFlexgetStream(
    '/tasks/execute',
    Method.Post,
  );

  const [state, dispatch] = useReducer(taskReducer, {
    tasks: {},
  });

  const execute = useCallback(
    (body: ExecuteTaskRequest) => {
      disconnect();
      dispatch(actions.clear());
      connect(body);
    },
    [connect, disconnect],
  );

  useEffect(() => disconnect, [disconnect]);

  useEffect(() => {
    stream
      ?.node('{tasks}', (e: TasksEvent) => dispatch(actions.tasks(camelize(e))))
      .node('{progress}', (e: ProgressEvent) => dispatch(actions.progress(camelize(e))))
      .node('{entry_dump}', (e: EntryDumpEvent) => dispatch(actions.entryDump(camelize(e))))
      .node('{summary}', (e: SummaryEvent) => dispatch(actions.entryDump(camelize(e))));
  }, [stream]);

  const setTask = useCallback((_: ChangeEvent, id: number) => dispatch(actions.setTask(id)), []);

  return [
    { state, readyState },
    { execute, setTask },
  ] as const;
};
