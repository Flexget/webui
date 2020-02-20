import { lazy } from 'react';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import { registerPlugin } from 'core/plugins/registry';

export default () =>
  registerPlugin('/series', {
    component: lazy(() =>
      import(
        /* webpackChunkName: 'SeriesPlugin' */
        'plugins/series/Series'
      ),
    ),
    displayName: 'Series',
    icon: LiveTvIcon,
  });
