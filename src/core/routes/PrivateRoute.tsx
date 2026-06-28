import { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useContainer } from 'unstated-next';
import { AuthContainer } from 'core/auth/hooks';

interface Props {
  element: ReactElement;
}

const PrivateRoute: FC<Props> = ({ element }) => {
  const [loggedIn] = useContainer(AuthContainer);
  const location = useLocation();
  return loggedIn ? element : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
