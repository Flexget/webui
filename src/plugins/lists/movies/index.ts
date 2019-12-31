import { createAsyncComponent } from 'utils/loading';
import registry from 'core/routes/registry';
import { MovieOutlined } from '@material-ui/icons';

export default () =>
  registry.registerPlugin('movieList', {
    component: createAsyncComponent(() =>
      import(
        /* webpackChunkName: 'MovieListPlugin' */
        'plugins/lists/movies/MovieList'
      ),
    ),
    routeDisplayName: 'Movie List',
    routeIcon: MovieOutlined,
  });
