import { connect } from 'react-redux';
import Routes from './Routes';

function mapStateToProps({ routes }) {
  return Object.values(routes);
}

export default connect(mapStateToProps)(Routes);
