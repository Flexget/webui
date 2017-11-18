import { createAsyncComponent } from 'utils/loading';
import registry from 'core/registry';
import saga from './data/saga';
import reducer from './data/reducer';

export default () => registry.registerPlugin('history', {
  component: createAsyncComponent(() => import('plugins/history/components')),
  routeDisplayName: 'History',
  routeIcon: 'history',
  reducer,
  saga,
});
