import { createAsyncComponent } from 'utils/loading';
import { registerPlugin } from 'core/routes/registry';
import { CreateTwoTone } from '@material-ui/icons';

export default () =>
  registerPlugin('/config', {
    component: createAsyncComponent(async () => {
      await import(
        /* webpackChunkName: 'ConfigPlugin' */
        '@flexget/monaco-yaml/lib/esm/monaco.contribution'
      );
      return import(
        /* webpackChunkName: 'ConfigPlugin' */
        'plugins/config/Config'
      );
    }),
    routeDisplayName: 'Config',
    routeIcon: CreateTwoTone,
  });
