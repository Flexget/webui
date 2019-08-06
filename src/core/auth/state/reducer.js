import { ERROR_STATUS } from 'core/status/state/actions';
import { GET_VERSION } from 'core/version/state/actions';
import { LOGIN, LOGOUT } from './actions';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOGIN:
    case GET_VERSION:
      return {
        loggedIn: true,
      };
    case LOGOUT:
      return {};
    case ERROR_STATUS:
      if (action.payload.statusCode === 401) {
        return {};
      }

    // falls through
    default:
      return state;
  }
}
