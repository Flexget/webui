import { lazy } from 'react';
import { CreateTwoTone } from '@mui/icons-material';
import { registerPlugin } from 'core/plugins/registry';

export default () =>
  registerPlugin('/config', {
    component: lazy(() =>
      import(
        /* webpackChunkName: 'ConfigPlugin' */
        'plugins/config/Config'
      )
    ),
    displayName: 'Config',
    icon: CreateTwoTone,
  });
