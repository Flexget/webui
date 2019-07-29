import { GET_HISTORY } from './actions';

const initState = {
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
