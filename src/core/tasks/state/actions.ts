import {
  RequestsOfType as ROT,
  action,
  ActionsUnion,
  requestAction,
  errorAction,
  successAction,
} from 'core/request/state/util';

import { StatusError } from 'utils/fetch';

import { Task } from './types';

export const enum Constants {
  GET_TASKS = '@flexget/tasks/GET_TASKS',
  RECENT_TASK = '@flexget/tasks/RECENT_TASK',
}

const actions = {
  getTasks: {
    request: () => requestAction(Constants.GET_TASKS),
    success: (tasks: Task[]) => successAction(Constants.GET_TASKS, { tasks }),
    failure: (err: StatusError) => errorAction(Constants.GET_TASKS, err),
  },
  recent: (task: Task) => action(Constants.RECENT_TASK, { task }),
};

export type ActionTypes = ActionsUnion<typeof actions>;
export type RequestsOfType<T extends Constants> = ROT<ActionTypes, T>;

export default actions;
