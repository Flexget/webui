import registry from 'core/registry';
import saga from './data/saga';
import reducer from './data/reducer';

export default () => registry.registerPlugin('pending-list', {
  routeDisplayName: 'Pending List',
  routeIcon: 'playlist add check',
  reducer,
  saga,
});
