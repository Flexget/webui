import { createAsyncComponent } from 'utils/loading';
import { registerPlugin } from 'core/routes/registry';
import { ViewList } from '@material-ui/icons';

export default () =>
  registerPlugin('/entryList', {
    component: createAsyncComponent(() =>
      import(
        /* webpackChunkName: 'EntryListPlugin' */
        'plugins/lists/entry/EntryList'
      ),
    ),
    routeDisplayName: 'Entry List',
    routeIcon: ViewList,
  });
