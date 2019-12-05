import { connect } from 'react-redux';
import TaskSelector from 'common/TaskSelector/TaskSelector';
import actions from 'core/tasks/state/actions';

export function mapStateToProps({ tasks }) {
  return {
    tasks: tasks.configs,
    recent: tasks.recent,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    recentTask: task => dispatch(actions.recentTask(task)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskSelector);
