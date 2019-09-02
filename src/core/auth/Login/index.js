import { connect } from 'react-redux';
import { Constants } from 'core/version/state/actions';
import Login from './Login';

export function mapStateToProps({ auth, status }) {
  return {
    redirectToReferrer: !!auth.loggedIn,
    loading: !!status.loading[Constants.GET_VERSION],
  };
}

export default connect(mapStateToProps)(Login);
export { Login };
