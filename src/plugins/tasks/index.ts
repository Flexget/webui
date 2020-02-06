import { lazy } from 'react';
import { createAsyncComponent } from 'utils/loading';
import { registerPlugin } from 'core/plugins/registry';
import { Assignment } from '@material-ui/icons';

export default () =>
  registerPlugin('/tasks', {
    component: createAsyncComponent(() =>
      import(
        /* webpackChunkName: 'TasksPlugin' */
        'plugins/tasks/Tasks'
      ),
    ),
    routeDisplayName: 'Tasks',
    routeIcon: Assignment,
    cardComponent: lazy(() =>
      import(
        /* webpackChunkName: 'TasksHomeCard' */
        'plugins/tasks/Card'
      ),
    ),
  });
