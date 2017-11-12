import { createAsyncComponent } from 'utils/loading';
import registry from 'core/registry';
import saga from './data/saga';
import reducer from './data/reducer';

export default () => registry.registerPlugin('series', {
  component: createAsyncComponent(() => import('plugins/series/components')),
  routeDisplayName: 'Series',
  routeIcon: 'tv',
  reducer,
  saga,
});
