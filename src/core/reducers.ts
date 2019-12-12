import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import history from 'core/history';
import { connectRouter } from 'connected-react-router';
import routes from 'core/routes/state/reducer';
import status from 'core/status/state/reducer';

export default function createReducers(reducers = {}) {
  return combineReducers({
    form,
    routes,
    status,
    router: connectRouter(history),
    ...reducers,
  });
}
