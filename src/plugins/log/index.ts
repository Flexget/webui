import { createAsyncComponent } from 'utils/loading';
import registry from 'core/routes/registry';
import ListAltIcon from '@material-ui/icons/ListAlt';
import saga from './state/saga';
import reducer from './state/reducer';

export default () =>
  registry.registerPlugin('log', {
    component: createAsyncComponent(() => import('plugins/log/Log')),
    routeDisplayName: 'Log',
    routeIcon: ListAltIcon,
    reducer,
    saga,
  });
