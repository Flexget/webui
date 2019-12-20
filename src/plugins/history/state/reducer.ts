import { Constants, ActionTypes } from './actions';
import { History } from '../types';

export interface State {
  items: History[];
  totalCount?: number;
}

const initState: State = {
  items: [],
};

export default function reducer(state = initState, action: ActionTypes): State {
  switch (action.type) {
    case Constants.GET_HISTORY: {
      const { payload } = action;
      return {
        totalCount: parseInt(payload.headers.get('total-count') ?? '0', 10),
        items: payload.refresh ? payload.data : [...state.items, ...payload.data],
      };
    }
    default:
      return state;
  }
}
