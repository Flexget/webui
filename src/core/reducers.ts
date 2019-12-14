import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import history from 'core/history';
import { connectRouter } from 'connected-react-router';

export default function createReducers(reducers = {}) {
  return combineReducers({
    form,
    router: connectRouter(history),
    ...reducers,
  });
}
