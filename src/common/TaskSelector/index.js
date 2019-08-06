import { connect } from 'react-redux';
import TaskSelector from 'common/TaskSelector/TaskSelector';
import { action } from 'utils/actions';
import { RECENT_TASK } from 'core/tasks/state/actions';

export function mapStateToProps({ tasks }) {
  return {
    tasks: tasks.configs,
    recent: tasks.recent,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    recentTask: task => dispatch(action(RECENT_TASK, { task })),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskSelector);
