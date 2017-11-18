import { createAsyncComponent } from 'utils/loading';
import registry from 'core/registry';
import saga from './data/saga';
import reducer from './data/reducer';

export default () => registry.registerPlugin('log', {
  component: createAsyncComponent(() => import('plugins/log/components')),
  routeDisplayName: 'Log',
  routeIcon: 'book',
  reducer,
  saga,
});
