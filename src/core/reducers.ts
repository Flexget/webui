import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import history from 'core/history';
import { connectRouter } from 'connected-react-router';
import auth from 'core/auth/state/reducer';
import routes from 'core/routes/state/reducer';
import status from 'core/status/state/reducer';
import tasks from 'core/tasks/state/reducer';
import version from 'core/version/state/reducer';

export default function createReducers(reducers = {}) {
  return combineReducers({
    auth,
    form,
    routes,
    status,
    version,
    tasks,
    router: connectRouter(history),
    ...reducers,
  });
}
