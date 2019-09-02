import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import history from 'core/history';
import createReducer from 'core/reducers';
import status from 'core/status/state/middleware';
import actions from 'core/routes/state/actions';
import rootSaga from 'core/sagas';
import registry from 'core/registry';

const sagaMiddleware = createSagaMiddleware();
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = (__DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(
  createReducer(),
  composeEnhancers(applyMiddleware(status, routerMiddleware(history), sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

registry.onRegisterReducer = reducers => store.replaceReducer(createReducer(reducers));
registry.onRegisterSaga = saga => sagaMiddleware.run(saga);
registry.onRegisterRoute = data => store.dispatch(actions.addRoute(data));

export default store;

if (module.hot && __DEV__) {
  module.hot.accept('core/reducers', () => {
    const nextCreateReducer = require('core/reducers').default; // eslint-disable-line global-require
    store.replaceReducer(nextCreateReducer(registry.reducers));
  });
}
