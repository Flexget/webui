import { createAsyncComponent } from 'utils/loading';
import registry from 'core/routes/registry';
import LiveTvIcon from '@material-ui/icons/LiveTv';

export default () =>
  registry.registerPlugin('series', {
    component: createAsyncComponent(() =>
      import(
        /* webpackChunkName: 'SeriesPlugin' */
        'plugins/series/Series'
      ),
    ),
    routeDisplayName: 'Series',
    routeIcon: LiveTvIcon,
  });
