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
        lists: payload.lists,
      };
    case actions.ADD_LIST:
      return {
        ...state,
        lists: [...state.lists, payload.list],
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
          [payload.listId]: {
            totalCount: payload.headers.get('total-count'),
            items: payload.refresh ? payload.entries : [...state.items, ...payload.entries],
          },
        },
      };
    case actions.ADD_ENTRY:
      return {
        ...state,
        entries: {
          ...state.entries,
          [payload.listId]: {
            totalCount: state.entries[payload.listId].totalCount + 1,
            // This isn't going to work right with pagination...will figure it out later
            items: [payload.entry, ...state.entries[payload.listId].items],
          },
        },
      };
    case actions.REMOVE_ENTRY:
      return {
        ...state,
        entries: {
          ...state.entries,
          [payload.listId]: {
            totalCount: state.entries[payload.listId].totalCount - 1,
            items: state.entries[payload.listId].items.filter(item => item.id === payload.id),
          },
        },
      };
    case actions.REJECT_ENTRY:
    case actions.APPROVE_ENTRY:
      return {
        ...state,
        entries: {
          ...state.entries,
          [payload.listId]: {
            ...state.entries[payload.listId],
            items: state.entries[payload.listId].items.map((item) => {
              if (item.id === payload.entry.id) {
                return payload.entry;
              }
              return item;
            }),
          },
        },
      };
    default:
      return state;
  }
}
