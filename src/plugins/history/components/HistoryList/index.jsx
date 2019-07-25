import React, { forwardRef } from 'react';
import { connect } from 'react-redux';
import { getGroupedHistory } from 'plugins/history/data/selectors';
import HistoryList from './HistoryList';

export function mapStateToProps({ history }, { grouping }) {
  return {
    history: getGroupedHistory(history, grouping),
    hasMore: !history.totalCount || history.items.length < history.totalCount,
  };
}

const ConnectedHistoryList = connect(mapStateToProps)(HistoryList);
export default forwardRef((props, { listRef, scrollRef }) => (
  <ConnectedHistoryList {...props} ref={listRef} scrollRef={scrollRef} />
));
export { HistoryList };
