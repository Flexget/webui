import { createAsyncComponent } from 'utils/loading';
import { registerPlugin } from 'core/routes/registry';
import ListAltIcon from '@material-ui/icons/ListAlt';

export default () =>
  registerPlugin('/log', {
    component: createAsyncComponent(() =>
      import(
        /* webpackChunkName: 'LogPlugin' */
        'plugins/log/Log'
      ),
    ),
    routeDisplayName: 'Log',
    routeIcon: ListAltIcon,
  });
