import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import { NoPaddingWrapper } from 'components/styles';
import TabList from './TabList';

class PendingList extends PureComponent {
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
      </NoPaddingWrapper>
    );
  }
}

export default hot(module)(PendingList);
