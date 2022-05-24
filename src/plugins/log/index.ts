import { lazy } from 'react';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { registerPlugin } from 'core/plugins/registry';

export default () =>
  registerPlugin('/log', {
    component: lazy(
      () =>
        import(
          /* webpackChunkName: 'LogPlugin' */
          'plugins/log/Log'
        ),
    ),
    displayName: 'Log',
    icon: ListAltIcon,
  });
