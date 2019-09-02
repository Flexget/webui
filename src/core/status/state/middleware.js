import { Constants } from './actions';

export default store => next => action => {
  if (action.error && action.meta && action.payload) {
    return next({
      type: Constants.ERROR_STATUS,
      error: true,
      payload: {
        message: action.payload.message,
        statusCode: action.payload.status,
        type: action.type,
      },
    });
  }
  if (action.meta && action.meta.message) {
    store.dispatch({
      type: Constants.INFO_STATUS,
      payload: {
        type: action.type,
        message: action.meta.message,
      },
    });
  }
  return next(action);
};
