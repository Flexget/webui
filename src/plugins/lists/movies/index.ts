import { lazy } from 'react';
import { MovieOutlined } from '@mui/icons-material';
import { registerPlugin } from 'core/plugins/registry';

export default () =>
  registerPlugin('/movieList', {
    component: lazy(
      () =>
        import(
          /* webpackChunkName: 'MovieListPlugin' */
          'plugins/lists/movies/MovieList'
        ),
    ),
    displayName: 'Movie List',
    icon: MovieOutlined,
  });
