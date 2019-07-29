import { connect } from 'react-redux';
import SideNav from './SideNav';

function mapStateToProps({ routes }) {
  return {
    routes: Object.values(routes),
  };
}

export default connect(mapStateToProps)(SideNav);
