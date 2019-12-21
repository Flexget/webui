import { combineReducers } from 'redux';

export default function createReducers(reducers = {}) {
  return combineReducers({
    ...reducers,
  });
}
