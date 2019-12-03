import { connect } from 'react-redux';
import actions from 'core/auth/state/actions';
import LoginCard from './LoginCard';

export function mapStateToProps({ status }) {
  return {
    initialValues: {
      username: 'flexget',
    },
    errorStatus: status.error || {},
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: ({ username, password }) => dispatch(actions.login.request(username, password)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginCard);
export { LoginCard };
