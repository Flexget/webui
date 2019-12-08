import { Constants, ActionTypes } from './actions';
import { Task } from '../types';

export interface State {
  configs: Task[];
  recent: Task[];
}

const initState: State = {
  configs: [],
  recent: [],
};

export default function reducer(state = initState, action: ActionTypes) {
  switch (action.type) {
    case Constants.GET_TASKS: {
      const { payload } = action;
      const tasks = [...payload.tasks];
      tasks.sort((a, b) => a.name.localeCompare(b.name));
      return {
        ...state,
        configs: tasks,
      };
    }

    case Constants.RECENT_TASK: {
      const { payload } = action;
      return {
        ...state,
        recent: [payload.task, ...state.recent.filter(t => t.name !== payload.task.name)].slice(
          0,
          3,
        ),
      };
    }

    default:
      return state;
  }
}
