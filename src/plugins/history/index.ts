import { createAsyncComponent } from 'utils/loading';
import { registerPlugin } from 'core/plugins/registry';
import HistoryIcon from '@material-ui/icons/History';

export default () =>
  registerPlugin('/history', {
    component: createAsyncComponent(() =>
      import(
        /* webpackChunkName: 'HistoryPlugin' */
        'plugins/history/History'
      ),
    ),
    routeDisplayName: 'History',
    routeIcon: HistoryIcon,
  });
