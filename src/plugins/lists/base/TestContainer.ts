import { useMemo, useCallback } from 'react';
import { useFlexgetAPI } from 'core/api';
import { Method } from 'utils/fetch';
import { createPluginContainer } from './hooks/api';

export const TestContainer = createPluginContainer(() => {
  return {
    sortByOptions: useMemo(
      () => [
        {
          value: 'added',
          label: 'Date Added',
        },
        {
          value: 'title',
          label: 'Title',
        },
        {
          value: 'url',
          label: 'URL',
        },
      ],
      [],
    ),
    api: {
      list: {
        get: useFlexgetAPI('/managed_list'),
        add: useFlexgetAPI('/managed_list', Method.Post),
        remove: useFlexgetAPI(
          useCallback((listId?: number) => `/managed_list/${listId}`, []),
          Method.Delete,
        ),
      },
      entry: {
        get: useFlexgetAPI(
          useCallback(
            (listId: number, query: string) => `/managed_list/${listId}/entries?${query}`,
            [],
          ),
        ),
        add: useFlexgetAPI(
          useCallback((listId: number) => `/managed_list/${listId}/entries`, []),
          Method.Post,
        ),
        remove: useFlexgetAPI(
          useCallback(
            (listId: number, entryId: number) => `/managed_list/${listId}/entries/${entryId}`,
            [],
          ),
          Method.Delete,
        ),
        removeBulk: useFlexgetAPI(
          useCallback((listId: number) => `/managed_list/${listId}/entries/batch`, []),
          Method.Delete,
        ),
      },
    },
  };
});
