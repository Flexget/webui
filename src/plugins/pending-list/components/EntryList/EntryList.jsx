import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FlexGetEntry from 'common/FlexGetEntry';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Entry from '../Entry';
import {
  EntryWrapper,
  ListWrapper,
  ButtonWrapper,
} from './styles';

export default class EntryList extends PureComponent {
  static propTypes = {
    listId: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    entries: PropTypes.shape({
      page: PropTypes.number,
      totalCount: PropTypes.number,
      items: PropTypes.arrayOf(PropTypes.instanceOf(FlexGetEntry)),
    }).isRequired,
    getEntries: PropTypes.func.isRequired,
    getTasks: PropTypes.func.isRequired,
  }

  static defaultProps = {
    listId: false,
  }

  state = {
    sortBy: 'added',
    sortOrder: 'desc',
  }

  componentDidMount() {
    const { getTasks } = this.props;
    // Load tasks for TaskSelector
    getTasks();
    this.updateEntries();
  }

  componentDidUpdate(prevProps, prevState) {
    const { listId } = this.props;
    const { sortBy, sortOrder } = this.state;
    if (
      listId !== prevProps.listId ||
      sortBy !== prevState.sortBy ||
      sortOrder !== prevState.sortOrder
    ) {
      this.updateEntries();
    }
  }

  updateEntries() {
    const { sortBy, sortOrder } = this.state;
    this.props.getEntries({ sort_by: sortBy, order: sortOrder });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { entries: { items }, listId } = this.props;
    const { sortBy, sortOrder } = this.state;

    if (!listId) {
      return null;
    }

    return (
      <div>
        <ButtonWrapper>
          <FormControl>
            <Select
              value={sortBy}
              onChange={this.handleChange}
              inputProps={{
                name: 'sortBy',
                id: 'sortBy',
              }}
            >
              <MenuItem value="added">Date Added</MenuItem>
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="original_url">URL</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <Select
              value={sortOrder}
              onChange={this.handleChange}
              inputProps={{
                name: 'sortOrder',
                id: 'sortOrder',
              }}
            >
              <MenuItem value="desc">Desc</MenuItem>
              <MenuItem value="asc">Asc</MenuItem>
            </Select>
          </FormControl>
        </ButtonWrapper>
        <ListWrapper>
          {items && items.map(entry => (
            <EntryWrapper key={entry.id}>
              <Entry entry={entry} />
            </EntryWrapper>
          ))}
        </ListWrapper>
      </div>
    );
  }
}
