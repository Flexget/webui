import { lazy } from 'react';
import { ViewList } from '@mui/icons-material';
import { registerPlugin } from 'core/plugins/registry';

export default () =>
  registerPlugin('/entryList', {
    component: lazy(
      () =>
        import(
          /* webpackChunkName: 'EntryListPlugin' */
          'plugins/lists/entry/EntryList'
        ),
    ),
    displayName: 'Entry List',
    icon: ViewList,
  });
