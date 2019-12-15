import { combineReducers } from 'redux';
import history from 'core/history';
import { connectRouter } from 'connected-react-router';

export default function createReducers(reducers = {}) {
  return combineReducers({
    router: connectRouter(history),
    ...reducers,
  });
}
