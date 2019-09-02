import { connect } from 'react-redux';
import actions from 'core/version/state/actions';
import Version from './Version';

export function mapStateToProps({ version }) {
  return {
    version,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getVersion: () => dispatch(actions.getVersion.request()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Version);
export { Version };
