import { useEffect, useState, useMemo } from 'react';
import { createContainer } from 'unstated-next';

import {
  Route,
  PluginUpdateHandler,
  Plugin,
  PluginEvent,
  PluginMap,
  SubscribeHandler,
} from './types';

const enum Events {
  RegisterPlugin = 'register',
  UnregisterPlugin = 'unregister',
  Update = 'update',
}

export class PluginRegistry extends EventTarget {
  _plugins: Record<string, Plugin> = {};

  constructor() {
    super();
    this.addEventListener(Events.RegisterPlugin, (e: CustomEvent<PluginEvent>) => {
      this.registerPlugin(e.detail.path, e.detail.plugin);
    });
  }

  subscribe(fn: SubscribeHandler) {
    const handler = (e: CustomEvent<PluginMap>) => {
      fn(e.detail);
    };
    this.addEventListener(Events.Update, handler);
    return () => this.unsubscribe(handler);
  }

  unsubscribe(fn: PluginUpdateHandler) {
    this.removeEventListener(Events.Update, fn);
  }

  get plugins() {
    return this._plugins;
  }

  set plugins(plugins: PluginMap) {
    this._plugins = plugins;
    this.dispatchEvent(new CustomEvent(Events.Update, { detail: plugins }));
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

export const registerPlugin = (path: string, plugin: Plugin) => {
  const event = new CustomEvent<PluginEvent>(Events.RegisterPlugin, {
    detail: {
      path,
      plugin,
    },
  });
  registry.dispatchEvent(event);
};

window.registerFlexgetPlugin = registerPlugin;

export const PluginContainer = createContainer(() => {
  const [pluginMap, setPlugins] = useState<PluginMap>(registry.plugins);

  useEffect(() => {
    const unsubscribe = registry.subscribe(setPlugins);

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
