import FlexGetEntry from 'common/FlexGetEntry';
import { Constants, ActionTypes } from './actions';
import { List } from './types';

interface Entries {
  totalCount: number;
  page: number;
  items: FlexGetEntry[];
}

export interface State {
  entries: Entries;
  lists: List[];
  selected?: number;
}

const initState: State = {
  lists: [],
  entries: {
    totalCount: 0,
    page: 0,
    items: [],
  },
};

export default function reducer(state = initState, action: ActionTypes): State {
  switch (action.type) {
    case Constants.GET_LISTS: {
      const {
        payload: { lists },
      } = action;
      return {
        ...state,
        lists,
        selected: lists.length ? lists[0].id : undefined,
      };
    }
    case Constants.SELECT_LIST: {
      const {
        payload: { selected },
      } = action;
      return {
        ...state,
        selected,
      };
    }
    case Constants.ADD_LIST: {
      const {
        payload: { list },
      } = action;
      return {
        ...state,
        lists: [...state.lists, list],
      };
    }
    case Constants.REMOVE_LIST: {
      const {
        payload: { id },
      } = action;
      return {
        ...state,
        lists: state.lists.filter(item => item.id !== id),
      };
    }
    case Constants.GET_ENTRIES: {
      const {
        payload: { headers, page, entries },
      } = action;
      return {
        ...state,
        entries: {
          totalCount: parseInt(headers.get('total-count') ?? '0', 10),
          page,
          items: entries,
        },
      };
    }
    case Constants.INJECT_ENTRY:
    case Constants.REMOVE_ENTRY: {
      const { payload } = action;
      return {
        ...state,
        entries: {
          ...state.entries,
          items: state.entries.items.filter(entry => entry.id !== payload.entry.id),
        },
      };
    }
    case Constants.REJECT_ENTRY:
    case Constants.APPROVE_ENTRY: {
      const { payload } = action;
      return {
        ...state,
        entries: {
          ...state.entries,
          items: state.entries.items.map(item => {
            if (item.id === payload.entry.id) {
              return payload.entry;
            }
            return item;
          }),
        },
      };
    }
    default:
      return state;
  }
}
