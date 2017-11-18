import { GET_HISTORY } from 'plugins/history/data/actions';

const initState = {
  totalCount: 0,
  items: [],
};


export default function reducer(state = initState, { type, payload }) {
  switch (type) {
    case GET_HISTORY:
      return {
        totalCount: payload.headers.get('total-count'),
        items: payload.refresh ? payload.data : [...state.items, ...payload.data],
      };
    default:
      return state;
  }
}
