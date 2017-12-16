import { createAsyncComponent } from 'utils/loading';
import registry from 'core/registry';
import saga from './data/saga';
import reducer from './data/reducer';

export default () => registry.registerPlugin('pendingList', {
  component: createAsyncComponent(() => import('plugins/pending-list/components')),
  routeDisplayName: 'Pending List',
  routeIcon: 'check',
  reducer,
  saga,
});
