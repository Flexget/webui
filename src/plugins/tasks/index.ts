import { lazy } from 'react';
import { registerPlugin } from 'core/plugins/registry';
import { Assignment } from '@material-ui/icons';

export default () =>
  registerPlugin('/tasks', {
    component: lazy(() =>
      import(
        /* webpackChunkName: 'TasksPlugin' */
        'plugins/tasks/Tasks'
      ),
    ),
    displayName: 'Tasks',
    icon: Assignment,
    cardComponent: lazy(() =>
      import(
        /* webpackChunkName: 'TasksHomeCard' */
        'plugins/tasks/Card'
      ),
    ),
  });
