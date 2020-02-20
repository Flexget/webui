import { lazy } from 'react';
import { CreateTwoTone } from '@material-ui/icons';
import { registerPlugin } from 'core/plugins/registry';

export default () =>
  registerPlugin('/config', {
    component: lazy(async () => {
      await import(
        /* webpackChunkName: 'ConfigPlugin' */
        '@flexget/monaco-yaml/lib/esm/monaco.contribution'
      );
      return import(
        /* webpackChunkName: 'ConfigPlugin' */
        'plugins/config/Config'
      );
    }),
    displayName: 'Config',
    icon: CreateTwoTone,
  });
