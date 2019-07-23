import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import { MenuItem } from 'material-ui/Menu';
import SecondaryNav from 'components/SecondaryNav';
import { Spacer } from 'components/styles';
import { RotatingIcon, PaddedTextField } from './styles';

const ENTER_KEY = 13;
const groupByFields = [
  {
    value: 'task',
    label: 'Task',
  },
  {
    value: 'time',
    label: 'Time',
  },
];

const sortByFields = [
  {
    value: 'details',
    label: 'Details',
  },
  {
    value: 'filename',
    label: 'Filename',
  },
  {
    value: 'id',
    label: 'ID',
  },
  {
    value: 'task',
    label: 'Task',
  },
  {
    value: 'time',
    label: 'Time',
  },
  {
    value: 'title',
    label: 'Title',
  },
  {
    value: 'url',
    label: 'URL',
  },
];

class FilterNav extends Component {
  static propTypes = {
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    grouping: PropTypes.oneOf(groupByFields.map(({ value }) => value)).isRequired,
    sort: PropTypes.oneOf(sortByFields.map(({ value }) => value)).isRequired,
    toggleOrder: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
  };

  state = {
    task: '',
  }

  handleChange = (event) => {
    this.setState({ task: event.target.value });
  }

  handleKeyPress = (event) => {
    const { handleChange } = this.props;
    if (event.which === ENTER_KEY) {
      handleChange('task')(event);
    }
  }

  render() {
    const {
      order,
      grouping,
      sort,
      toggleOrder,
      handleChange,
    } = this.props;

    const {
      task,
    } = this.state;

    return (
      <SecondaryNav>
        <PaddedTextField
          label="Filter By Task"
          id="task-filter"
          placeholder="Task Name"
          value={task}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
        <Spacer />
        <PaddedTextField
          id="sort-by"
          select
          label="Sort By"
          value={sort}
          onChange={handleChange('sort')}
        >
          {sortByFields.map(({ value, label }) => (
            <MenuItem value={value} key={value}>{label}</MenuItem>
          ))}
        </PaddedTextField>
        <PaddedTextField
          id="group-by"
          label="Group By"
          select
          value={grouping}
          onChange={handleChange('grouping')}
        >
          {groupByFields.map(({ value, label }) => (
            <MenuItem value={value} key={value}>{label}</MenuItem>
          ))}
        </PaddedTextField>
        <IconButton color="inherit" onClick={toggleOrder}>
          <RotatingIcon rotate={order === 'desc'} className="fa fa-chevron-up" />
        </IconButton>
      </SecondaryNav>
    );
  }
}

export default FilterNav;
