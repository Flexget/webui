import { groupBy } from 'utils/array';
import { HistoryItem, GroupByFields } from './types';

export const getGroupedHistory = (items: HistoryItem[], grouping: GroupByFields) =>
  groupBy(
    items,
    grouping,
    grouping === GroupByFields.Time ? (i: string) => i.split('T')[0] : undefined,
  );
