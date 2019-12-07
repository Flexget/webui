import { useState, useCallback } from 'react';

export const useOverlayState = (defaultState: boolean) => {
  const [isOpen, setOpen] = useState(defaultState);

  const openOverlay = useCallback(() => setOpen(true), [setOpen]);
  const closeOverlay = useCallback(() => setOpen(false), [setOpen]);

  return { isOpen, openOverlay, closeOverlay };
};
