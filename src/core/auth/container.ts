import { useState, useCallback } from 'react';
import { createContainer } from 'unstated-next';

const useAuth = (initialState = false) => {
  const [loggedIn, setLoggedIn] = useState(initialState);

  const login = useCallback(() => setLoggedIn(true), []);
  const logout = useCallback(() => setLoggedIn(false), []);
  return [loggedIn, { login, logout }] as const;
};

export const AuthContainter = createContainer(useAuth);
