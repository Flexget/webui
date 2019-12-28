import { createAsyncComponent } from 'utils/loading';
import registry from 'core/routes/registry';
import { MovieOutlined } from '@material-ui/icons';

export default () =>
  registry.registerPlugin('movieList', {
    component: createAsyncComponent(() => import('plugins/lists/movies/MovieList')),
    routeDisplayName: 'Movie List',
    routeIcon: MovieOutlined,
  });
