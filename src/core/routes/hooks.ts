import { useMemo } from 'react';
import { useContainer } from 'unstated-next';
import { PluginContainer } from 'core/plugins/hooks';
import { Route } from './types';

export const useGetRoutes = () => {
  const { pluginMap } = useContainer(PluginContainer);
  const routes: Route[] = useMemo(
    () =>
      Object.entries(pluginMap).flatMap(([path, { component, displayName, icon }]) =>
        component
          ? [
              {
                path,
                component,
                Icon: icon,
                name: displayName,
              },
            ]
          : [],
      ),
    [pluginMap],
  );
  return { routes };
};
