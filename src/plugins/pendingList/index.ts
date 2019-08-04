import { createAsyncComponent } from 'utils/loading';
import registry from 'core/registry';
import saga from './state/saga';
import reducer from './state/reducer';

export default () => registry.registerPlugin('pendingList', {
  component: createAsyncComponent(() => import('plugins/pendingList/PendingList')),
  routeDisplayName: 'Pending List',
  routeIcon: 'check',
  reducer,
  saga,
});
