import { createAsyncComponent } from 'utils/loading';
import { registerPlugin } from 'core/routes/registry';
import LiveTvIcon from '@material-ui/icons/LiveTv';

export default () =>
  registerPlugin('series', {
    component: createAsyncComponent(() =>
      import(
        /* webpackChunkName: 'SeriesPlugin' */
        'plugins/series/Series'
      ),
    ),
    routeDisplayName: 'Series',
    routeIcon: LiveTvIcon,
  });
