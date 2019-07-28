import { camelize } from 'humps';
import { ReducersMapObject } from 'redux';
import {
  ReducerHandler,
  SagaHandler,
  RouteHandler,
  Plugin,
} from './types';

export class PluginRegistry {
  reducers: ReducersMapObject;

  reducerHandler: ReducerHandler;

  sagaHandler: SagaHandler;

  routeHandler: RouteHandler;

  constructor() {
    this.reducers = {};
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

  registerPlugin(name: string, {
    component,
    children,
    routeDisplayName,
    routeIcon,
    reducer,
    saga,
  }: Plugin = {}) {
    if (!name) {
      throw Error('Plugin requires name');
    }
    if (component || children) {
      if (!routeDisplayName || !routeIcon) {
        throw Error('Component requires routeDisplayname and routeIcon');
      }

      this.routeHandler({
        path: `/${name}`, component, children, routeDisplayName, routeIcon,
      });
    }

    if (children) {
      children.forEach((child) => {
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
  }
}

const registry = new PluginRegistry();

// Exposed on window so that custom plugins can be registered

window.registerFlexgetPlugin = registry.registerPlugin;

export default registry;
