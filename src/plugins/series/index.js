import { createAsyncComponent } from 'utils/loading';
import registry from 'core/registry';
import saga from './state/saga';
import reducer from './state/reducer';

export default () => registry.registerPlugin('series', {
  component: createAsyncComponent(() => import('plugins/series/Series')),
  routeDisplayName: 'Series',
  routeIcon: 'tv',
  reducer,
  saga,
});
