import { createAsyncComponent } from 'utils/loading';
import registry from 'core/routes/registry';
import HistoryIcon from '@material-ui/icons/History';

export default () =>
  registry.registerPlugin('history', {
    component: createAsyncComponent(() =>
      import(
        /* webpackChunkName: 'HistoryPlugin' */
        'plugins/history/History'
      ),
    ),
    routeDisplayName: 'History',
    routeIcon: HistoryIcon,
  });
