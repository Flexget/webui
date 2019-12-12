import { createAsyncComponent } from 'utils/loading';
import CheckIcon from '@material-ui/icons/Check';
import registry from 'core/registry';

export default () =>
  registry.registerPlugin('pendingList', {
    component: createAsyncComponent(() => import('plugins/pendingList/PendingList')),
    routeDisplayName: 'Pending List',
    routeIcon: CheckIcon,
  });
