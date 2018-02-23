import React, { PureComponent } from 'react';
import { NoPaddingWrapper } from 'common/styles';
import TabList from './TabList';
import EntryList from './EntryList';
import Pagination from './Pagination';
import { Content } from './styles';

export default class PendingList extends PureComponent {
  state = {
    listId: false,
  }

  selectList = listId => this.setState({ listId })

  render() {
    const { listId } = this.state;

    return (
      <NoPaddingWrapper>
        <TabList
          listId={listId}
          selectList={this.selectList}
        />
        <Content>
          <EntryList listId={listId} />
        </Content>
        <Pagination listId={listId} />
      </NoPaddingWrapper>
    );
  }
}
