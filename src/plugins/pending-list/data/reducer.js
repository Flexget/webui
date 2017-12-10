import * as actions from './actions';

const initState = {
  lists: [],
  entries: {},
};

export default function reducer(state = initState, { payload, type }) {
  switch (type) {
    case actions.GET_LISTS:
      return {
        ...state,
        lists: payload,
      };
    case actions.ADD_LIST:
      return {
        ...state,
        lists: [...state.lists, payload],
      };
    case actions.REMOVE_LIST:
      return {
        ...state,
        lists: state.lists.filter(item => item.id === payload.id),
      };
    case actions.GET_ENTRIES:
      return {
        ...state,
        entries: {
          ...state.entries,
          [payload.listId]: payload.entries,
        },
      };
    case actions.ADD_ENTRY:
      return {
        ...state,
        entries: {
          ...state.entries,
          [payload.listId]: [
            ...state.entries[payload.listId],
            payload.entry,
          ],
        },
      };
    case actions.REMOVE_ENTRY:
      return {
        ...state,
        entries: {
          ...state.entries,
          [payload.listId]: state.entries[payload.listId].filter(item => item.id === payload.id),
        },
      };
    case actions.REJECT_ENTRY:
    case actions.APPROVE_ENTRY:
      return {
        ...state,
        entries: {
          ...state.entries,
          [payload.listId]: state.entries[payload.listId].map((item) => {
            if (item.id === payload.entry.id) {
              return payload.entry;
            }
            return item;
          }),
        },
      };
    default:
      return state;
  }
}
