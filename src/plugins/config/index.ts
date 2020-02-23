import { lazy } from 'react';
import { CreateTwoTone } from '@material-ui/icons';
import { registerPlugin } from 'core/plugins/registry';

export default () =>
  registerPlugin('/config', {
    component: lazy(async () => {
      await import(
        /* webpackChunkName: 'ConfigPlugin' */
        'monaco-yaml/esm/monaco.contribution'
      );
      return import(
        /* webpackChunkName: 'ConfigPlugin' */
        'plugins/config/Config'
      );
    }),
    displayName: 'Config',
    icon: CreateTwoTone,
  });
