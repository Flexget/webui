import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';
import registry from 'core/registry';

export const RouteContainer = createContainer(() => {
  const [routes, setRoutes] = useState(registry.routes);

  useEffect(() => {
    registry.onRegisterRoute = route => setRoutes(r => [...r, route]);
  });

  return [routes, setRoutes] as const;
});
