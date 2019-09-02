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
    onSubmit: credentials => dispatch(actions.login.request(credentials)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginCard);
export { LoginCard };
