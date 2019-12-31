import { Route, RouteHandler, Plugin } from './types';

export class PluginRegistry {
  routeHandler: RouteHandler;

  routes: Record<string, Route>;

  constructor() {
    this.routes = {};
    this.routeHandler = () => {};
  }

  set onRegisterRoute(fn: RouteHandler) {
    this.routeHandler = fn;
  }

  registerPlugin = (name: string, { component, routeDisplayName, routeIcon }: Plugin) => {
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
  };
}

const registry = new PluginRegistry();

// Exposed on window so that custom plugins can be registered

window.registerFlexgetPlugin = registry.registerPlugin;

export default registry;
