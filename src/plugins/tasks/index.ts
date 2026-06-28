import { lazy } from 'react';
import { registerPlugin } from 'core/plugins/registry';
import { Assignment } from '@mui/icons-material';

export default () =>
  registerPlugin('/tasks', {
    component: lazy(
      () =>
        import(
          /* webpackChunkName: 'TasksPlugin' */
          'plugins/tasks/Tasks'
        ),
    ),
    displayName: 'Tasks',
    icon: Assignment,
    cardComponent: lazy(
      () =>
        import(
          /* webpackChunkName: 'TasksHomeCard' */
          'plugins/tasks/Card'
        ),
    ),
  });
