import { Reducer, useCallback, useEffect, useState, useReducer } from 'react';
import { stringify } from 'qs';
import { createContainer } from 'unstated-next';
import { useFlexgetAPI, useFlexgetStream } from 'core/api';
import { Method, snakeCase, camelize } from 'utils/fetch';
import { action } from 'utils/hooks/actions';
import { RawEntry } from 'core/entry/types';
import {
  EntryDumpEvent,
  EventTypes,
  ExecuteTaskRequest,
  Execution,
  Progress,
  ProgressEvent,
  StreamEvent,
  Summary,
  SummaryEvent,
  Task,
  TaskExecutionOptions,
  TaskStatus,
  TaskStatusOptions,
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

interface TaskExecuteState extends Task {
  progress: Progress[];
  summary?: Summary;
  entries?: RawEntry[];
}

const actions = {
  stream: (e: StreamEvent) => action(EventTypes.Stream, e),
  progress: (e: ProgressEvent) => action(EventTypes.Progress, e),
  entryDump: (e: EntryDumpEvent) => action(EventTypes.EntryDump, e),
  summary: (e: SummaryEvent) => action(EventTypes.Summary, e),
};

type Actions = PropReturnType<typeof actions>;

const taskReducer: Reducer<Record<number, TaskExecuteState>, Actions> = (state, act) => {
  switch (act.type) {
    case EventTypes.Stream:
      return act.payload.stream.reduce(
        (ts, task) => ({
          ...ts,
          [task.id]: {
            ...task,
            progress: [],
          },
        }),
        {},
      );
    case EventTypes.Progress: {
      const e = act.payload;
      const task = state[e.taskId];
      return {
        ...state,
        [task.id]: {
          ...task,
          progress: [e.progress, ...task.progress],
        },
      };
    }
    case EventTypes.EntryDump: {
      const e = act.payload;
      const task = state[e.taskId];
      return {
        ...state,
        [task.id]: {
          ...task,
          entries: e.entryDump,
        },
      };
    }
    case EventTypes.Summary: {
      const e = act.payload;
      const task = state[e.taskId];
      return {
        ...state,
        [task.id]: {
          ...task,
          summary: e.summary,
        },
      };
    }
    default:
      return state;
  }
};

export const useExecuteTaskStream = () => {
  const [{ readyState, stream }, { connect, disconnect }] = useFlexgetStream(
    '/tasks/execute',
    Method.Post,
  );

  const [state, dispatch] = useReducer(taskReducer, {});

  useEffect(() => disconnect, [disconnect]);

  useEffect(() => {
    stream
      ?.node(EventTypes.Stream, (e: StreamEvent) => dispatch(actions.stream(camelize(e))))
      .node(EventTypes.Progress, (e: ProgressEvent) => dispatch(actions.progress(camelize(e))))
      .node(EventTypes.EntryDump, (e: EntryDumpEvent) => dispatch(actions.entryDump(camelize(e))))
      .node(EventTypes.Summary, (e: SummaryEvent) => dispatch(actions.entryDump(camelize(e))));
  }, [stream]);

  const execute = useCallback((body: ExecuteTaskRequest) => connect(body), [connect]);

  return [{ state, readyState }, { execute }] as const;
};
