import { useState } from 'react';
import { createContainer } from 'unstated-next';

const useAuth = (initialState = false) => {
  return useState(initialState);
};

export const AuthContainter = createContainer(useAuth);
