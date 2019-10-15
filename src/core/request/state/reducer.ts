import { LOCATION_CHANGE, LocationChangePayload } from 'connected-react-router';
import { Requests } from './types';
import { Constants, ActionTypes } from './actions';
import { isRequestAction, Action, UnknownAction } from './util';

export interface State {
  requests: Requests;
}

const initState: State = {
  requests: {},
};

export default (
  state = initState,
  action:
    | ActionTypes
    | Action<typeof LOCATION_CHANGE, LocationChangePayload, undefined>
    | UnknownAction,
): State => {
  switch (action.type) {
    case LOCATION_CHANGE:
    case Constants.CLEAR_ALL_REQUESTS:
      return {
        requests: {},
      };
    case Constants.CLEAR_REQUEST: {
      const requests = { ...state.requests };
      const {
        payload: { requestActions },
      } = action as Action<Constants.CLEAR_REQUEST, { requestActions: string[] }>;
      requestActions.forEach(a => delete requests[a]);

      return {
        requests,
      };
    }
    default:
      if (isRequestAction(action)) {
        return {
          requests: {
            ...state.requests,
            [action.type]: action.meta,
          },
        };
      }
      return state;
  }
};
