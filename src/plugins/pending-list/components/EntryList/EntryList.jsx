import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { EntryShape } from 'plugins/pending-list/data/shapes';
import Entry from '../Entry';
import AddEntryDialog from '../AddEntryDialog';
import RemoveEntryDialog from '../RemoveEntryDialog';
import {
  EntryWrapper,
  ListWrapper,
  ButtonWrapper,
  AddEntryButton,
  Icon,
} from './styles';

export default class EntryList extends PureComponent {
  static propTypes = {
    listId: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    entries: PropTypes.shape({
      page: PropTypes.number,
      totalCount: PropTypes.number,
      items: PropTypes.arrayOf(EntryShape),
    }).isRequired,
    getEntries: PropTypes.func.isRequired,
  }

  static defaultProps = {
    listId: false,
  }

  state = {
    removeEntry: null,
    entryModalOpen: false,
  }

  componentDidMount() {
    this.props.getEntries();
  }

  componentWillReceiveProps({ listId, getEntries }) {
    if (this.props.listId !== listId) {
      getEntries();
    }
  }

  openRemoveEntryModal = entry => () => this.setState({ removeEntry: entry })
  closeRemoveEntryModal = () => this.setState({ removeEntry: null })
  openAddEntryModal = () => this.setState({ entryModalOpen: true })
  closeAddEntryModal = () => this.setState({ entryModalOpen: false })


  render() {
    const { entries, listId } = this.props;
    const { removeEntry, entryModalOpen } = this.state;

    if (!listId) {
      return null;
    }

    return (
      <div>
        <ButtonWrapper>
          <AddEntryButton
            color="primary"
            dense
            onClick={this.openAddEntryModal}
          >
            <Icon icon="plus-circle" />
            Add Entry
          </AddEntryButton>
        </ButtonWrapper>
        <ListWrapper>
          {entries.items && entries.items.map(entry => (
            <EntryWrapper key={entry.id}>
              <Entry
                entry={entry}
                openRemoveModal={this.openRemoveEntryModal(entry)}
              />
            </EntryWrapper>
          ))}
        </ListWrapper>
        <RemoveEntryDialog
          entry={removeEntry}
          onClose={this.closeRemoveEntryModal}
        />
        <AddEntryDialog
          open={entryModalOpen}
          onClose={this.closeAddEntryModal}
          listId={listId}
        />
      </div>
    );
  }
}
