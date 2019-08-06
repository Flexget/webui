import { createAsyncComponent } from 'utils/loading';
import registry from 'core/registry';
import saga from './state/saga';
import reducer from './state/reducer';

export default () =>
  registry.registerPlugin('history', {
    component: createAsyncComponent(() => import('plugins/history/History')),
    routeDisplayName: 'History',
    routeIcon: 'history',
    reducer,
    saga,
  });
