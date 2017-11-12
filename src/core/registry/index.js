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
    routeDisplayName,
    routeIcon,
    reducer,
    saga,
  } = {}) {
    if (!name) {
      throw Error('Plugin requires name');
    }
    if (component) {
      if (!routeDisplayName || !routeIcon) {
        throw Error('Component requires routeDisplayname and routeIcon');
      }

      this.routeHandler({ path: `/${name}`, component, routeDisplayName, routeIcon });
    }

    if (reducer) {
      this.reducers[name] = reducer;
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
