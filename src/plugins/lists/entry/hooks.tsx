import { useCallback, useMemo } from 'react';
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
    api: {
      list: {
        get: useFlexgetAPI('/entry_list'),
        add: useFlexgetAPI('/entry_list', Method.Post),
        remove: useFlexgetAPI(
          useCallback((listId?: number) => `/entry_list/${listId}`, []),
          Method.Delete,
        ),
      },
      entry: {
        get: useFlexgetAPI(
          useCallback(
            (listId: number, query: string) => `/entry_list/${listId}/entries?${query}`,
            [],
          ),
        ),
        add: useFlexgetAPI(
          useCallback((listId: number) => `/entry_list/${listId}/entries`, []),
          Method.Post,
        ),
        remove: useFlexgetAPI(
          useCallback(
            (listId: number, entryId: number) => `/entry_list/${listId}/entries/${entryId}`,
            [],
          ),
          Method.Delete,
        ),
        removeBulk: useFlexgetAPI(
          useCallback((listId: number) => `/entry_list/${listId}/entries/batch`, []),
          Method.Delete,
        ),
      },
    },
  };
});
