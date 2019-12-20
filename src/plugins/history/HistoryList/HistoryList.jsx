import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HistoryShape } from 'plugins/history/state/shapes';
import InfiniteScroll from 'react-infinite-scroller';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import LoadingSpinner from 'common/LoadingSpinner';
import { subheader, wrapper } from './styles';

class HistoryList extends Component {
  static propTypes = {
    grouping: PropTypes.oneOf(['time', 'task']).isRequired,
    history: PropTypes.objectOf(PropTypes.arrayOf(HistoryShape)).isRequired,
    hasMore: PropTypes.bool,
    getHistory: PropTypes.func.isRequired,
    scrollRef: PropTypes.object.isRequired,
  };

  static defaultProps = {
    hasMore: true,
  };

  render() {
    const { grouping, history, hasMore, getHistory, scrollRef } = this.props;

    return (
      <div css={wrapper}>
        <InfiniteScroll
          hasMore={hasMore}
          loadMore={getHistory}
          loader={<LoadingSpinner loading />}
          ref={scrollRef}
          useWindow={false}
        >
          {Object.entries(history).map(([header, histories]) => (
            <List
              key={header}
              subheader={
                <ListSubheader color="primary" css={subheader}>
                  {header}
                </ListSubheader>
              }
            >
              {histories.map(({ id, title, time, task }) => (
                <ListItem key={id}>
                  <ListItemText
                    primary={title}
                    secondary={grouping === 'time' ? task : new Date(time).toString()}
                  />
                </ListItem>
              ))}
            </List>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

export default HistoryList;
