import { useState, useCallback, useReducer } from 'react';

export const useOverlayState = (defaultState = false) => {
  const [isOpen, setOpen] = useState(defaultState);

  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen(o => !o), []);

  return [isOpen, { open, close, toggle }] as const;
};

export const useMergeState = <T>(defaultState: T) => {
  return useReducer(
    (state: T, action: Partial<T>) => ({
      ...state,
      ...action,
    }),
    defaultState,
  );
};
