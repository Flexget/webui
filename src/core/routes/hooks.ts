import { useEffect, useState, useMemo } from 'react';
import { createContainer } from 'unstated-next';
import { Route, PluginMap } from './types';
import { subscribe } from './registry';

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
