import { Constants, ActionTypes } from './actions';
import { LogMessage } from './types';

interface State {
  messages: LogMessage[];
  connected: Boolean;
}

const initState: State = {
  messages: [],
  connected: false,
};

export default function reducer(state = initState, action: ActionTypes): State {
  switch (action.type) {
    case Constants.LOG_CONNECT:
      return {
        ...state,
        messages: [],
        connected: true,
      };
    case Constants.LOG_MESSAGE:
      return {
        ...state,
        messages: [action.payload, ...state.messages],
      };
    case Constants.LOG_DISCONNECT:
      return {
        ...state,
        connected: false,
      };
    case Constants.LOG_CLEAR:
      return {
        ...state,
        messages: [],
      };
    default:
      return state;
  }
}
