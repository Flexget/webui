import { lazy } from 'react';
import HistoryIcon from '@material-ui/icons/History';
import { registerPlugin } from 'core/plugins/registry';

export default () =>
  registerPlugin('/history', {
    component: lazy(
      () =>
        import(
          /* webpackChunkName: 'HistoryPlugin' */
          'plugins/history/History'
        ),
    ),
    displayName: 'History',
    icon: HistoryIcon,
  });
