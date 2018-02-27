import { connect } from 'react-redux';
import Pagination from './Pagination';

function mapStateToProps({ pendingList }) {
  return {
    entries: pendingList.entries,
  };
}

export default connect(mapStateToProps, null)(Pagination);
