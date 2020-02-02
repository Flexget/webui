import { useEffect, useState, useMemo } from 'react';
import { createContainer } from 'unstated-next';

import { Route, Plugin, PluginEvent, PluginMap, SubscribeHandler } from './types';

const enum Events {
  RegisterPlugin = 'register',
  UnregisterPlugin = 'unregister',
  Update = 'update',
}

export class PluginRegistry {
  _plugins: Record<string, Plugin> = {};

  constructor() {
    document.addEventListener(Events.RegisterPlugin, (e: CustomEvent<PluginEvent>) => {
      this.registerPlugin(e.detail.path, e.detail.plugin);
    });
  }

  get plugins() {
    return this._plugins;
  }

  set plugins(plugins: PluginMap) {
    this._plugins = plugins;
    document.dispatchEvent(new CustomEvent(Events.Update, { detail: plugins }));
  }

  registerPlugin(path: string, plugin: Plugin) {
    if (!path) {
      throw Error('Plugin requires path');
    }

    if (!plugin.routeDisplayName || !plugin.routeIcon || !plugin.component) {
      throw Error('Plugin requires routeDisplayname, routeIcon, and component');
    }

    this.plugins = { ...this.plugins, [path]: plugin };
  }
}

const registry = new PluginRegistry();

export const subscribe = (fn: SubscribeHandler) => {
  const handler = (e: CustomEvent<PluginMap>) => {
    fn(e.detail);
  };

  // Make an inital call incase all plugins have already been registered
  fn(registry.plugins);
  document.addEventListener(Events.Update, handler);
  return () => document.removeEventListener(Events.Update, handler);
};

export const registerPlugin = (path: string, plugin: Plugin) => {
  const event = new CustomEvent<PluginEvent>(Events.RegisterPlugin, {
    detail: {
      path,
      plugin,
    },
  });
  document.dispatchEvent(event);
};

window.registerFlexgetPlugin = registerPlugin;
window.subscribeFlexgetPlugins = subscribe;

export const PluginContainer = createContainer(() => {
  const [pluginMap, setPlugins] = useState<PluginMap>({});

  useEffect(() => {
    const unsubscribe = subscribe(setPlugins);

    return unsubscribe;
  }, []);

  const routes: Route[] = useMemo(
    () =>
      Object.entries(pluginMap).map(([path, { component, routeDisplayName, routeIcon }]) => ({
        path,
        component,
        Icon: routeIcon,
        name: routeDisplayName,
      })),
    [pluginMap],
  );

  return { routes };
});
// Exposed on window so that custom plugins can be registered
