import { createAsyncComponent } from 'utils/loading';
import CheckIcon from '@material-ui/icons/Check';
import registry from 'core/registry';
import saga from './state/saga';
import reducer from './state/reducer';

export default () =>
  registry.registerPlugin('pendingList', {
    component: createAsyncComponent(() => import('plugins/pendingList/PendingList')),
    routeDisplayName: 'Pending List',
    routeIcon: CheckIcon,
    reducer,
    saga,
  });
