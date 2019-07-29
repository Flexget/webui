import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FlexGetEntry from 'common/FlexGetEntry';
import Entry from '../Entry';
import {
  EntryWrapper,
  ListWrapper,
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
    sortBy: PropTypes.string.isRequired,
    sortOrder: PropTypes.string.isRequired,
    perPage: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
  }

  static defaultProps = {
    listId: false,
  }

  componentDidMount() {
    const { getTasks } = this.props;
    // Load tasks for TaskSelector
    getTasks();
    this.updateEntries();
  }

  componentDidUpdate(prevProps) {
    const {
      listId, sortBy, sortOrder, page, perPage, entries: { items = [] },
    } = this.props;

    const { entries: { items: preItems = [] } } = prevProps;

    // If list of sort options have changes
    if (
      listId !== prevProps.listId ||
      page !== prevProps.page ||
      sortBy !== prevProps.sortBy ||
      sortOrder !== prevProps.sortOrder ||
      perPage !== prevProps.perPage
    ) {
      this.updateEntries();
    }

    // Check if entries were removed, probably due to an action such as remove
    // Delay the update for 100ms
    if (preItems.length > items.length) {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => this.updateEntries(), 1000);
    }
  }

  updateEntries() {
    const {
      sortBy, sortOrder, page, perPage,
    } = this.props;

    this.props.getEntries({
      sort_by: sortBy, order: sortOrder, per_page: perPage, page,
    });
  }

  render() {
    const { entries: { items = [] }, listId } = this.props;

    return (
      <div>
        <ListWrapper>
          {listId === null && (
            <div>Please Select List</div>
          )}
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
