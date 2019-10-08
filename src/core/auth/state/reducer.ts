import {
  Constants as StatusConstants,
  ActionTypes as StatusActionTypes,
} from 'core/status/state/actions';
import {
  Constants as VersionConstants,
  ActionTypes as VersionActionTypes,
} from 'core/version/state/actions';
import { Constants, ActionTypes } from './actions';

export interface State {
  loggedIn?: Boolean;
}

const initState: State = {
  loggedIn: false,
};

export default function reducer(
  state = initState,
  action: ActionTypes | StatusActionTypes | VersionActionTypes,
): State {
  switch (action.type) {
    case Constants.LOGIN:
    case VersionConstants.GET_VERSION:
      return {
        loggedIn: true,
      };
    case Constants.LOGOUT:
      return {};
    case StatusConstants.ERROR_STATUS:
      if (action.payload.statusCode === 401) {
        return {};
      }
    // falls through
    default:
      return state;
  }
}
