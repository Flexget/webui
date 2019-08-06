import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import Fade from '@material-ui/core/Fade';

class TaskSelector extends PureComponent {
  static propTypes = {
    handleClose: PropTypes.func.isRequired,
    handleClick: PropTypes.func.isRequired,
    recentTask: PropTypes.func.isRequired,
    tasks: PropTypes.array.isRequired,
    recent: PropTypes.array.isRequired,
    anchorEl: PropTypes.object,
  };

  static defaultProps = {
    anchorEl: null,
  };

  handleClick = event => {
    const { handleClick, recentTask, tasks } = this.props;
    const taskName = event.target.getAttribute('value');
    const task = tasks.reduce((accum, t) => {
      if (t.name === taskName) return t;
      return accum;
    }, null);
    if (task) recentTask(task);
    handleClick(task);
  };

  render() {
    const { tasks, recent, anchorEl, handleClose } = this.props;

    return (
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transition={Fade}
      >
        {recent.length > 0 && (
          <div>
            <ListSubheader>Recent</ListSubheader>
            {recent.map(t => (
              <MenuItem onClick={this.handleClick} value={t.name} key={t.name}>
                {t.name}
              </MenuItem>
            ))}
            <Divider />
          </div>
        )}
        <span>Recent</span>
        {tasks.map(t => (
          <MenuItem onClick={this.handleClick} value={t.name} key={t.name}>
            {t.name}
          </MenuItem>
        ))}
      </Menu>
    );
  }
}

export default TaskSelector;
