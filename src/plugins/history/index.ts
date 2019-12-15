import { createAsyncComponent } from 'utils/loading';
import registry from 'core/routes/registry';
import HistoryIcon from '@material-ui/icons/History';
import saga from './state/saga';
import reducer from './state/reducer';

export default () =>
  registry.registerPlugin('history', {
    component: createAsyncComponent(() => import('plugins/history/Wrapper')),
    routeDisplayName: 'History',
    routeIcon: HistoryIcon,
    reducer,
    saga,
  });
