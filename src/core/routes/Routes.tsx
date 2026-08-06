import { useEffect, FC } from 'react';
import { useContainer } from 'unstated-next';
import { Routes, Route, useLocation } from 'react-router-dom';
import { StatusContainer, actions } from 'core/status/hooks';
import { useGetRoutes } from 'core/routes/hooks';
import PrivateRoute from './PrivateRoute';

const AppRoutes: FC = () => {
  const { routes } = useGetRoutes();
  const location = useLocation();
  const [, dispatch] = useContainer(StatusContainer);
  useEffect(() => dispatch(actions.clear()), [dispatch, location]);

  return (
    <Routes>
      {routes.map(({ path, component: Component }) => (
        <Route
          key={path}
          path={`${path}/*`}
          element={<PrivateRoute element={<Component />} />}
        />
      ))}
    </Routes>
  );
};

export default AppRoutes;
