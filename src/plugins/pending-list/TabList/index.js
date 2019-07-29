import { connect } from 'react-redux';
import { request } from 'utils/actions';
import { GET_LISTS } from '../state/actions';
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
