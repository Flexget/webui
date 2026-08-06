import { forwardRef, useMemo } from 'react';
import { Theme, ListItemText, ListItem, ListSubheader, List, Typography } from '@mui/material';
import { SearchOff } from '@mui/icons-material';
import InfiniteScroll from 'react-infinite-scroller';
import { GroupByFields, GetHistoryOptions, HistoryItem } from 'plugins/history/types';
import LoadingSpinner from 'common/LoadingSpinner';
import { css } from '@emotion/react';
import { getGroupedHistory } from 'plugins/history/utils';
import { useHistoryPlugin } from './hooks';

const subheader = (theme: Theme) => css`
  background-color: ${theme.palette.background.paper};
`;

const wrapper = css`
  overflow-y: scroll;
  flex: 1;
`;

const empty = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 0;
  gap: 1rem;
`;

interface Props {
  options: GetHistoryOptions;
  loadMore: (page: number) => void;
}

const HistoryList = forwardRef<InfiniteScroll, Props>(({ options, loadMore }, scrollRef) => {
  const { items, total, loading } = useHistoryPlugin(options);
  const history = useMemo(
    () => getGroupedHistory(items, options.grouping),
    [items, options.grouping],
  );

  if (!loading && items.length === 0) {
    return (
      <div css={empty}>
        <SearchOff color="disabled" fontSize="large" />
        <Typography color="text.secondary">No history found</Typography>
      </div>
    );
  }

  return (
    <div css={wrapper}>
      <InfiniteScroll
        hasMore={loading ? false : items.length < total}
        loadMore={loadMore}
        loader={<LoadingSpinner key={0} />}
        ref={scrollRef}
        useWindow={false}
      >
        {Object.entries(history).map(([header, histories]: [string, HistoryItem[]]) => (
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
                  secondary={
                    options.grouping === GroupByFields.Time ? task : new Date(time).toString()
                  }
                />
              </ListItem>
            ))}
          </List>
        ))}
      </InfiniteScroll>
    </div>
  );
});

export default HistoryList;
