import React from 'react';
import Loadable from '@loadable/component';
import { CircularProgress } from '@material-ui/core';

export function createAsyncComponent(loader) {
  return Loadable(loader, {
    fallback: <CircularProgress />,
  });
}
