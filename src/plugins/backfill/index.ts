import { lazy } from 'react';
import UpdateIcon from '@material-ui/icons/Update';
import { registerPlugin } from 'core/plugins/registry';

export default () =>
  registerPlugin('/backfill', {
    component: lazy(
      () =>
        import(
          /* webpackChunkName: 'BackfillPlugin' */
          'plugins/backfill/Backfill'
        ),
    ),
    displayName: 'Backfill',
    icon: UpdateIcon,
    hidden: true,
  });
