import { connect } from 'react-redux';
import { LOGOUT } from 'core/auth/state/actions';
import { SERVER_RELOAD, SERVER_SHUTDOWN } from 'core/server/state/actions';
import { request } from 'utils/actions';
import Navbar from './Navbar';

function mapStateToProps({ router, routes }) {
  return {
    pathname: router.location.pathname,
    titleMap: Object.values(routes).reduce((obj, route) => ({
      ...obj,
      [route.path]: route.name,
      ...(route.children ? route.children.reduce((o, r) => ({
        ...o,
        [r.path]: r.name,
      }), {}) : {}),
    }), {}),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(request(LOGOUT)),
    reloadServer: () => dispatch(request(SERVER_RELOAD)),
    shutdownServer: () => dispatch(request(SERVER_SHUTDOWN)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
export { Navbar };
