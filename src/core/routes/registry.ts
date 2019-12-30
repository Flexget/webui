import { camelize } from 'humps';
import { ReducersMapObject } from 'redux';
import { Route, ReducerHandler, SagaHandler, RouteHandler, Plugin } from './types';

export class PluginRegistry {
  reducers: ReducersMapObject;

  reducerHandler: ReducerHandler;

  sagaHandler: SagaHandler;

  routeHandler: RouteHandler;

  routes: Record<string, Route>;

  constructor() {
    this.reducers = {};
    this.routes = {};
    this.reducerHandler = () => {};
    this.sagaHandler = () => {};
    this.routeHandler = () => {};
  }

  set onRegisterReducer(fn: ReducerHandler) {
    this.reducerHandler = fn;
  }

  set onRegisterSaga(fn: SagaHandler) {
    this.sagaHandler = fn;
  }

  set onRegisterRoute(fn: RouteHandler) {
    this.routeHandler = fn;
  }

  registerPlugin = <S = any>(
    name: string,
    { component, children, routeDisplayName, routeIcon, reducer, saga }: Plugin<S>,
  ) => {
    if (!name) {
      throw Error('Plugin requires name');
    }

    if (!routeDisplayName || !routeIcon) {
      throw Error('Component requires routeDisplayname and routeIcon');
    }

    if (component) {
      const route = {
        name: routeDisplayName,
        component,
        Icon: routeIcon,
        path: `/${name}`,
      };

      this.routes = { ...this.routes, [route.path]: route };

      this.routeHandler({ [route.path]: route });
    }

    if (children) {
      children.forEach(child => {
        if (child.reducer) {
          this.reducers[camelize(name)] = child.reducer;
          this.reducerHandler(this.reducers);
        }

        if (child.saga) {
          this.sagaHandler(child.saga);
        }
      });
    }

    if (reducer) {
      this.reducers[camelize(name)] = reducer;
      this.reducerHandler(this.reducers);
    }

    if (saga) {
      this.sagaHandler(saga);
    }
  };
}

const registry = new PluginRegistry();

// Exposed on window so that custom plugins can be registered

window.registerFlexgetPlugin = registry.registerPlugin;

export default registry;
