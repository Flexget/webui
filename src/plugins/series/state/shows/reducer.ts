import { Constants, ActionTypes } from './actions';
import { Show } from './types';

export interface State {
  totalCount: number;
  items: Show[];
}

const initState: State = {
  totalCount: 0,
  items: [],
};

export default function reducer(state = initState, action: ActionTypes): State {
  switch (action.type) {
    case Constants.GET_SHOWS: {
      const { payload } = action;
      return {
        totalCount: parseInt(payload.headers.get('total-count') ?? '0', 10),
        items: payload.data,
      };
    }
    default:
      return state;
  }
}
