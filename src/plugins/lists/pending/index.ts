import { createAsyncComponent } from 'utils/loading';
import CheckIcon from '@material-ui/icons/Check';
import registry from 'core/routes/registry';

export default () =>
  registry.registerPlugin('pendingList', {
    component: createAsyncComponent(() => import('plugins/lists/pending/PendingList')),
    routeDisplayName: 'Pending List',
    routeIcon: CheckIcon,
  });
