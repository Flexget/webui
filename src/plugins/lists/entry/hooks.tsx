import { useMemo } from 'react';
import { useFlexgetAPI } from 'core/api';
import { Method } from 'utils/fetch';
import { SortBy } from './types';
import { createPluginContainer } from '../base/hooks/api';

export const EntryListContainer = createPluginContainer(() => {
  return {
    sortByOptions: useMemo(
      () => [
        {
          value: SortBy.Added,
          label: 'Date Added',
        },
        {
          value: SortBy.Title,
          label: 'Title',
        },
        {
          value: SortBy.URL,
          label: 'URL',
        },
      ],
      [],
    ),
    addEntryProps: useMemo(
      () => [
        {
          label: 'Entry Title',
          name: 'title',
        },
        {
          label: 'Entry URL',
          name: 'originalUrl',
        },
      ],
      [],
    ),
    api: {
      list: {
        useGet: () => useFlexgetAPI('/entry_list'),
        useAdd: () => useFlexgetAPI('/entry_list', Method.Post),
        useRemove: (listId?: number) => useFlexgetAPI(`/entry_list/${listId}`, Method.Delete),
      },
      entry: {
        useGet: (listId: number, query: string) =>
          useFlexgetAPI(`/entry_list/${listId}/entries?${query}`),
        useAdd: (listId?: number) => useFlexgetAPI(`/entry_list/${listId}/entries`, Method.Post),
        useRemove: (listId: number, entryId: number) =>
          useFlexgetAPI(`/entry_list/${listId}/entries/${entryId}`, Method.Delete),
        useRemoveBulk: (listId: number) =>
          useFlexgetAPI(`/entry_list/${listId}/entries/batch`, Method.Delete),
      },
    },
  };
});
