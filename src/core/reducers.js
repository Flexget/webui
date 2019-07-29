import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from 'core/auth/state/reducer';
import routes from 'core/routes/state/reducer';
import status from 'core/status/state/reducer';
import version from 'core/version/state/reducer';

export default function createReducers(reducers) {
  return combineReducers({
    auth,
    form,
    routes,
    status,
    version,
    ...reducers,
  });
}
