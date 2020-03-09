import { lazy } from 'react';
import { ViewList } from '@material-ui/icons';
import { registerPlugin } from 'core/plugins/registry';

export default () =>
  registerPlugin('/entryList', {
    component: lazy(() =>
      import(
        /* webpackChunkName: 'EntryListPlugin' */
        'plugins/lists/entry/EntryList'
      ),
    ),
    displayName: 'Entry List',
    icon: ViewList,
  });
