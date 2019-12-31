import { createAsyncComponent } from 'utils/loading';
import registry from 'core/routes/registry';
import ListAltIcon from '@material-ui/icons/ListAlt';

export default () =>
  registry.registerPlugin('log', {
    component: createAsyncComponent(() =>
      import(
        /* webpackChunkName: 'LogPlugin' */
        'plugins/log/Log'
      ),
    ),
    routeDisplayName: 'Log',
    routeIcon: ListAltIcon,
  });
