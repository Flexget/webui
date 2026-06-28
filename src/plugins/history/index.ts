import { lazy } from 'react';
import HistoryIcon from '@mui/icons-material/History';
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
