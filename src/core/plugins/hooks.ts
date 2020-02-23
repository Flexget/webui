import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';
import { PluginMap } from './types';
import { subscribe } from './registry';

export const PluginContainer = createContainer(() => {
  const [pluginMap, setPlugins] = useState<PluginMap>({});
  useEffect(() => {
    const unsubscribe = subscribe(setPlugins);
    return unsubscribe;
  }, []);

  return { pluginMap };
});
