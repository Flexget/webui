import actions from './actions';

export default store => next => action => {
  if (action.meta && action.meta.message) {
    store.dispatch(actions.info(action.type, action.meta.message));
  }
  return next(action);
};
