import { lazy } from 'react';
import CheckIcon from '@material-ui/icons/Check';
import { registerPlugin } from 'core/plugins/registry';

export default () =>
  registerPlugin('/pendingList', {
    component: lazy(() =>
      import(
        /* webpackChunkName: 'PendingListPlugin' */
        'plugins/lists/pending/PendingList'
      ),
    ),
    displayName: 'Pending List',
    icon: CheckIcon,
  });
