import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import history from 'core/history';
import createReducer from 'core/reducers';
import status from 'core/status/state/middleware';
import registry from 'core/routes/registry';

const sagaMiddleware = createSagaMiddleware();
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = (__DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(
  createReducer(),
  composeEnhancers(applyMiddleware(status, routerMiddleware(history), sagaMiddleware)),
);

registry.onRegisterReducer = reducers => store.replaceReducer(createReducer(reducers));
registry.onRegisterSaga = saga => sagaMiddleware.run(saga);

export default store;

if (module.hot && __DEV__) {
  module.hot.accept('core/reducers', () => {
    const nextCreateReducer = require('core/reducers').default; // eslint-disable-line global-require
    store.replaceReducer(nextCreateReducer(registry.reducers));
  });
}
