import { connect } from 'react-redux';
import { LOGOUT } from 'core/auth/data/actions';
import { SERVER_RELOAD, SERVER_SHUTDOWN } from 'core/server/data/actions';
import { request } from 'utils/actions';
import Navbar from './Navbar';

function mapStateToProps({ router }) {
  return {
    pathname: router.location.pathname,
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
