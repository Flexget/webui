import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from 'core/auth/data/reducer';
import routes from 'core/routes/data/reducer';
import status from 'core/status/data/reducer';
import version from 'core/version/data/reducer';
import tasks from 'core/tasks/data/reducer';

export default function createReducers(reducers) {
  return combineReducers({
    auth,
    form,
    routes,
    status,
    version,
    tasks,
    ...reducers,
  });
}
