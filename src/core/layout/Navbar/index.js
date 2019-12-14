import { connect } from 'react-redux';
import actions, { Operation } from 'core/server/state/actions';
import Navbar from './Navbar';

function mapStateToProps({ router, routes }) {
  return {
    pathname: router.location.pathname,
    titleMap: Object.values(routes || []).reduce(
      (obj, route) => ({
        ...obj,
        [route.path]: route.name,
        ...(route.children
          ? route.children.reduce(
              (o, r) => ({
                ...o,
                [r.path]: r.name,
              }),
              {},
            )
          : {}),
      }),
      {},
    ),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reloadServer: () => dispatch(actions.serverOperation.request(Operation.Reload)),
    shutdownServer: () => dispatch(actions.serverOperation.request(Operation.Shutdown)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
export { Navbar };
