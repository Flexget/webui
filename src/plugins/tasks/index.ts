import { createAsyncComponent } from 'utils/loading';
import registry from 'core/routes/registry';
import { Assignment } from '@material-ui/icons';

export default () =>
  registry.registerPlugin('tasks', {
    component: createAsyncComponent(() =>
      import(
        /* webpackChunkName: 'TasksPlugin' */
        'plugins/tasks/Tasks'
      ),
    ),
    routeDisplayName: 'Tasks',
    routeIcon: Assignment,
  });
