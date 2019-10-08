import { Constants, ActionTypes } from './actions';

export interface State {
  api?: string;
  flexget?: string;
  latest?: string;
}

const initState: State = {};

export default function reducer(state = initState, action: ActionTypes): State {
  switch (action.type) {
    case Constants.GET_VERSION: {
      const { apiVersion: api, flexgetVersion: flexget, latestVersion: latest } = action.payload;

      return { api, flexget, latest };
    }
    default:
      return state;
  }
}
