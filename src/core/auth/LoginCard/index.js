import { connect } from 'react-redux';
import LoginCard from './LoginCard';

export function mapStateToProps() {
  return {
    initialValues: {
      username: 'flexget',
    },
  };
}

export default connect(mapStateToProps)(LoginCard);
export { LoginCard };
