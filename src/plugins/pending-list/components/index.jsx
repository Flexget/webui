import React, { PureComponent } from 'react';
import Button from 'material-ui/Button';
import { NoPaddingWrapper } from 'common/styles';
import TabList from './TabList';
import AddEntryDialog from './AddEntryDialog';
import { ButtonWrapper, Content, AddEntryButton, Icon } from './styles';

export default class PendingList extends PureComponent {
  state = {
    listId: false,
    entryModalOpen: false,
  }

  selectList = listId => this.setState({ listId })

  openModal = () => this.setState({ entryModalOpen: true })
  closeModal = () => this.setState({ entryModalOpen: false })

  render() {
    const { listId, entryModalOpen } = this.state;

    return (
      <NoPaddingWrapper>
        <TabList
          listId={listId}
          selectList={this.selectList}
        />
        <Content>
          <ButtonWrapper>
            <AddEntryButton
              color="primary"
              dense
              onClick={this.openModal}
            >
              <Icon icon="plus-circle" />
              Add Entry
            </AddEntryButton>
          </ButtonWrapper>
        </Content>
        <AddEntryDialog
          open={entryModalOpen}
          onClose={this.closeModal}
          listId={listId}
        />
      </NoPaddingWrapper>
    );
  }
}
