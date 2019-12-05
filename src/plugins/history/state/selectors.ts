import { createSelector } from 'reselect';
import { groupBy } from 'utils/array';
import { State } from './reducer';
import { History } from './types';

const getItems = (history: State) => history.items;
const getGrouping = (_: State, grouping: string) => grouping;
const historyGroupBy = (
  items: History[],
  grouping: string,
  transform?: (s: string) => string,
): Record<string, History[]> => groupBy(items, grouping, transform);
const getHistoryGroupedByTime = createSelector([getItems, getGrouping], (items, grouping) =>
  historyGroupBy(items, grouping, (i: string) => i.split('T')[0]),
);
const getHistoryGroupedByTask = createSelector([getItems, getGrouping], historyGroupBy);

export const getGroupedHistory = (history: State, grouping: string) =>
  (grouping === 'time' ? getHistoryGroupedByTime : getHistoryGroupedByTask)(history, grouping);
