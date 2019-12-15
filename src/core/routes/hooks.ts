import { useEffect, useState, useMemo } from 'react';
import { createContainer } from 'unstated-next';
import registry from 'core/routes/registry';

export const RouteContainer = createContainer(() => {
  const [routeObj, setRoutes] = useState(registry.routes);

  useEffect(() => {
    registry.onRegisterRoute = route => setRoutes(r => ({ ...r, ...route }));
  }, []);

  const routes = useMemo(() => Object.values(routeObj), [routeObj]);

  return [routes, setRoutes] as const;
});
