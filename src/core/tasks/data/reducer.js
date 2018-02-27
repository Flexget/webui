import { GET_TASKS, RECENT_TASK } from 'core/tasks/data/actions';

const defaultState = { configs: [], recent: [] };

export default function reducer(state = defaultState, { payload, type }) {
  switch (type) {
    case GET_TASKS: {
      const tasks = [...payload.tasks];
      tasks.sort((a, b) => a.name.localeCompare(b.name));
      return {
        ...state,
        configs: tasks,
      };
    }

    case RECENT_TASK: {
      return {
        ...state,
        recent: [
          payload.task,
          ...state.recent.filter(t => t.name !== payload.task.name),
        ].slice(0, 3),
      };
    }

    default:
      return state;
  }
}
