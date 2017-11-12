import { LOGIN, LOGOUT } from 'core/auth/data/actions';
import { ERROR_STATUS } from 'core/status/data/actions';
import { GET_VERSION } from 'core/version/data/actions';

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
    default: // eslint-disable-line no-fallthrough
      return state;
  }
}
