import { combineReducers } from 'redux';
import shows from './shows/reducer';

const reducer = combineReducers({
  shows,
});

export type State = ReturnType<typeof reducer>;

export default reducer;
