import { useMemo } from 'react';
import { useContainer } from 'unstated-next';
import { PluginContainer } from 'core/plugins/hooks';
import { CardInfo } from './types';

export const useGetHomeCards = () => {
  const { pluginMap } = useContainer(PluginContainer);
  const cards: CardInfo[] = useMemo(
    () =>
      Object.entries(pluginMap).flatMap(([path, { cardComponent, routeDisplayName }]) =>
        cardComponent
          ? [
              {
                path,
                component: cardComponent,
                name: routeDisplayName,
              },
            ]
          : [],
      ),
    [pluginMap],
  );
  return { cards };
};
