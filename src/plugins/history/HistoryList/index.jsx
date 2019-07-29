import React, { forwardRef } from 'react';
import { connect } from 'react-redux';
import { getGroupedHistory } from 'plugins/history/state/selectors';
import HistoryList from './HistoryList';

export function mapStateToProps({ history }, { grouping }) {
  return {
    history: getGroupedHistory(history, grouping),
    hasMore: (!history.totalCount && history.totalCount !== 0)
      || history.items.length < history.totalCount,
  };
}

const ConnectedHistoryList = connect(mapStateToProps)(HistoryList);
export default forwardRef((props, ref) => (
  <ConnectedHistoryList {...props} scrollRef={ref} />
));
export { HistoryList };
