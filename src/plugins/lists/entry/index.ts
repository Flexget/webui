import { createAsyncComponent } from 'utils/loading';
import registry from 'core/routes/registry';
import { ViewList } from '@material-ui/icons';

export default () =>
  registry.registerPlugin('entryList', {
    component: createAsyncComponent(() =>
      import(
        /* webpackChunkName: 'EntryListPlugin' */
        'plugins/lists/entry/EntryList'
      ),
    ),
    routeDisplayName: 'Entry List',
    routeIcon: ViewList,
  });
