import * as actions from './actions';

const initState = {
  lists: [],
  selected: [],
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
        lists: state.lists.filter(item => item.id !== payload.id),
      };
    case actions.GET_ENTRIES:
      return {
        ...state,
        entries: {
          totalCount: parseInt(payload.headers.get('total-count'), 10),
          page: payload.page,
          items: payload.entries,
        },
      };
    case actions.INJECT_ENTRY:
    case actions.REMOVE_ENTRY:
      return {
        ...state,
        entries: {
          ...state.entries,
          items: state.entries.items.filter(entry => entry.id !== payload.entry.id),
        },
      };
    case actions.REJECT_ENTRY:
    case actions.APPROVE_ENTRY:
      return {
        ...state,
        entries: {
          ...state.entries,
          items: state.entries.items.map((item) => {
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
