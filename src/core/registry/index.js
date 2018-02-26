import { camelize } from 'humps';

class PluginRegistry {
  constructor() {
    this.reducers = {};
    this.reducerHandler = () => {};
    this.sagaHandler = () => {};
    this.routeHandler = () => {};
  }

  set onRegisterReducer(fn) {
    this.reducerHandler = fn;
  }

  set onRegisterSaga(fn) {
    this.sagaHandler = fn;
  }

  set onRegisterRoute(fn) {
    this.routeHandler = fn;
  }

  registerPlugin(name, {
    component,
    children,
    routeDisplayName,
    routeIcon,
    reducer,
    saga,
  } = {}) {
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
