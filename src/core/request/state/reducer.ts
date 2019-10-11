import { LOCATION_CHANGE } from 'connected-react-router';
import { Requests, RequestAction } from './types';
import { Constants, ActionTypes } from './actions';
import { isRequestAction } from './util';

export interface State {
  requests: Requests;
}

const initState: State = {
  requests: {},
};

export default (state = initState, action: ActionTypes | RequestAction): State => {
  if (action.type === LOCATION_CHANGE || action.type === Constants.CLEAR_REQUESTS) {
    return {
      requests: {},
    };
  }
  if (isRequestAction(action)) {
    return {
      requests: {
        ...state.requests,
        [action.type]: action.meta,
      },
    };
  }
  return state;
};
