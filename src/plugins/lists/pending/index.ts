import { createAsyncComponent } from 'utils/loading';
import CheckIcon from '@material-ui/icons/Check';
import { registerPlugin } from 'core/routes/registry';

export default () =>
  registerPlugin('/pendingList', {
    component: createAsyncComponent(() =>
      import(
        /* webpackChunkName: 'PendingListPlugin' */
        'plugins/lists/pending/PendingList'
      ),
    ),
    routeDisplayName: 'Pending List',
    routeIcon: CheckIcon,
  });
