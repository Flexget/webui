import { createAsyncComponent } from 'utils/loading';
import registry from 'core/routes/registry';
import { CreateOutlined, CreateTwoTone } from '@material-ui/icons';

export default () =>
  registry.registerPlugin('config', {
    component: createAsyncComponent(() =>
      import(
        /* webpackChunkName: 'ConfigPlugin' */
        'plugins/config/Config'
      ),
    ),
    routeDisplayName: 'Config',
    routeIcon: CreateTwoTone,
  });
