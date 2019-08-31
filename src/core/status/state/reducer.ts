import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import { Action } from 'utils/actions';
import { Constants, ActionTypes } from './actions';

export interface StatusState {
  loading: Record<string, boolean>;
  info?: string;
  error?: Error;
}

const initState: StatusState = {
  loading: {},
};

export default (state = initState, action: ActionTypes | LocationChangeAction | Action<''>) => {
  switch (action.type) {
    case Constants.LOADING_STATUS:
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.meta.type]: true,
        },
      };
    case Constants.ERROR_STATUS: {
      const { [action.payload.type]: _, ...loading } = state.loading;
      return {
        ...state,
        error: action.payload,
        loading,
      };
    }
    case Constants.INFO_STATUS:
      return {
        ...state,
        info: action.payload.message,
      };
    case Constants.CLOSE_STATUS:
    // falls through
    case LOCATION_CHANGE:
      return {
        ...initState,
        loading: state.loading,
      };
    default:
      if (state.loading[action.type]) {
        const { [action.type]: _, ...loading } = state.loading;
        return {
          ...state,
          loading,
        };
      }
      return state;
  }
};
