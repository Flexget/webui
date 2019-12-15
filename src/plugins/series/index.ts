import { createAsyncComponent } from 'utils/loading';
import registry from 'core/routes/registry';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import saga from './state/saga';
import reducer from './state/reducer';

export default () =>
  registry.registerPlugin('series', {
    component: createAsyncComponent(() => import('plugins/series/Series')),
    routeDisplayName: 'Series',
    routeIcon: LiveTvIcon,
    reducer,
    saga,
  });
