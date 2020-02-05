import { useMemo } from 'react';
import { useContainer } from 'unstated-next';
import { PluginContainer } from 'core/plugins/hooks';
import { Route } from './types';

export const useGetRoutes = () => {
  const { pluginMap } = useContainer(PluginContainer);
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
};
