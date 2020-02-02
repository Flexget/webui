import { createAsyncComponent } from 'utils/loading';
import { registerPlugin } from 'core/routes/registry';
import { MovieOutlined } from '@material-ui/icons';

export default () =>
  registerPlugin('/movieList', {
    component: createAsyncComponent(() =>
      import(
        /* webpackChunkName: 'MovieListPlugin' */
        'plugins/lists/movies/MovieList'
      ),
    ),
    routeDisplayName: 'Movie List',
    routeIcon: MovieOutlined,
  });
