import statusActions from 'core/status/state/actions';
import { RequestsOfType as ROT } from 'core/status/state/types';
import { action, ActionsUnion } from 'utils/actions';
import { StatusError } from 'utils/fetch';
import { Task } from './types';

export const enum Constants {
  GET_TASKS = '@flexget/tasks/GET_TASKS',
  RECENT_TASK = '@flexget/tasks/RECENT_TASK',
}

const actions = {
  getTasks: {
    request: () => statusActions.load(Constants.GET_TASKS),
    success: (tasks: Task[]) => action(Constants.GET_TASKS, { tasks }),
    failure: (err: StatusError) => statusActions.error(Constants.GET_TASKS, err),
  },
  recent: (task: Task) => action(Constants.RECENT_TASK, { task }),
};

export type ActionTypes = ActionsUnion<typeof actions>;
export type RequestsOfType<T extends Constants> = ROT<ActionTypes, T>;

export default actions;
