import { useState, useCallback } from 'react';
import { createContainer } from 'unstated-next';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => setIsLoggedIn(true), []);
  const logout = useCallback(() => setIsLoggedIn(false), []);
  return [isLoggedIn, { login, logout }] as const;
};

export const AuthContainter = createContainer(useAuth);
