import React, { PureComponent } from 'react';
import { NoPaddingWrapper } from 'common/styles';
import TabList from '../TabList';
import SortList from '../SortList';
import EntryList from '../EntryList';
import Pagination from '../Pagination';
import { Content } from './styles';

class PendingList extends PureComponent {
  state = {
    listId: false,
    page: 1,
    perPage: 50,
    sortBy: 'added',
    sortOrder: 'desc',
  }

  selectList = listId => this.setState({ listId, page: 1 })

  handleNewPage = page => this.setState({ page })

  handleSortUpdate = (sortBy, sortOrder, perPage) => this.setState({ sortBy, sortOrder, perPage })

  render() {
    const {
      listId, sortBy, sortOrder, perPage, page,
    } = this.state;

    return (
      <NoPaddingWrapper>
        <TabList
          listId={listId}
          selectList={this.selectList}
        />
        <Content>
          <SortList
            onSortUpdate={this.handleSortUpdate}
            sortBy={sortBy}
            sortOrder={sortOrder}
            perPage={perPage}
          />
          <EntryList
            listId={listId}
            sortBy={sortBy}
            sortOrder={sortOrder}
            page={page}
            perPage={perPage}
          />
        </Content>
        <Pagination listId={listId} onPageUpdate={this.handleNewPage} perPage={perPage} />
      </NoPaddingWrapper>
    );
  }
}

export default PendingList;
