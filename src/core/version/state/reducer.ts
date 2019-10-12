import { createSuccessCheck } from 'core/request/state/util';
import { Constants, ActionTypes } from './actions';

export interface State {
  api?: string;
  flexget?: string;
  latest?: string;
}

const initState: State = {};

export default function reducer(state = initState, action: ActionTypes): State {
  const check = createSuccessCheck(action);
  switch (true) {
    case check(Constants.GET_VERSION): {
      const { apiVersion: api, flexgetVersion: flexget, latestVersion: latest } = action.payload;

      return { api, flexget, latest };
    }
    default:
      return state;
  }
}
