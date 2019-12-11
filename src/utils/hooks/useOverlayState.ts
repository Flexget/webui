import { useState, useCallback } from 'react';

export const useOverlayState = (defaultState: boolean) => {
  const [isOpen, setOpen] = useState(defaultState);

  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen(o => !o), []);

  return [isOpen, { open, close, toggle }] as const;
};
