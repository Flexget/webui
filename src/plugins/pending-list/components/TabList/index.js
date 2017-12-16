import { connect } from 'react-redux';
import { GET_LISTS } from 'plugins/pending-list/data/actions';
import { request } from 'utils/actions';
import TabList from './TabList';

function mapStateToProps({ pendingList }) {
  return {
    lists: pendingList.lists,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getLists: () => dispatch(request(GET_LISTS)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TabList);
