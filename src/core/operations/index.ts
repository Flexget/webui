import { lazy } from 'react';
import { Settings } from '@material-ui/icons';
import { registerPlugin } from 'core/plugins/registry';

export default () =>
  registerPlugin('settings', {
    cardComponent: lazy(
      () =>
        import(
          /* webpackChunkName: 'LogPlugin' */
          './Card'
        ),
    ),
    displayName: 'Server Settings',
    icon: Settings,
  });
