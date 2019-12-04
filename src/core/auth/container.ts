import { useState } from 'react';
import { createContainer } from 'unstated-next';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);
  return [isLoggedIn, { login, logout }] as const;
};

export const AuthContainter = createContainer(useAuth);
