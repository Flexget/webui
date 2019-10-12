import {
  Constants as VersionConstants,
  ActionTypes as VersionActionTypes,
} from 'core/version/state/actions';
import { isInState } from 'core/request/state/util';
import { UnknownAction } from 'utils/actions';
import { Constants, ActionTypes } from './actions';

export interface State {
  loggedIn?: Boolean;
}

const initState: State = {
  loggedIn: false,
};

export default function reducer(
  state = initState,
  action: ActionTypes | VersionActionTypes | UnknownAction,
): State {
  if (
    isInState.success(action, Constants.LOGIN) ||
    isInState.success(action, VersionConstants.GET_VERSION)
  ) {
    return { loggedIn: true };
  }

  if (isInState.success(action, Constants.LOGOUT)) {
    return {};
  }

  if (isInState.error(action)) {
    if (action.meta.statusCode === 401) {
      return {};
    }
  }

  return state;
}
