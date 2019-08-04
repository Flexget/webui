import * as React from 'react';

export const useOverlayState = (defaultState: boolean) => {
  const [isOpen, setOpen] = React.useState(defaultState);

  const openOverlay = React.useCallback(() => setOpen(true), [setOpen]);
  const closeOverlay = React.useCallback(() => setOpen(false), [setOpen]);

  return { isOpen, openOverlay, closeOverlay };
};
