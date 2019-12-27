import React, { FC, useCallback } from 'react';
import { hot } from 'react-hot-loader/root';
import { useInjectPageTitle } from 'core/layout/AppBar/hooks';
import { createPluginContainer } from 'plugins/managedList/hooks/api';
import { useFlexgetAPI } from 'core/api';
import { Method } from 'utils/fetch';
import ManagedList from 'plugins/managedList';

const PendingListContainer = createPluginContainer(() => {
  return {
    list: {
      get: useFlexgetAPI('/pending_list'),
      add: useFlexgetAPI('/pending_list', Method.Post),
      remove: useFlexgetAPI(
        useCallback((listId?: number) => `/pending_list/${listId}`, []),
        Method.Delete,
      ),
    },
    entry: {
      get: useFlexgetAPI(
        useCallback(
          (listId: number, query: string) => `/pending_list/${listId}/entries?${query}`,
          [],
        ),
      ),
      add: useFlexgetAPI(
        useCallback((listId: number) => `/pending_list/${listId}/entries`, []),
        Method.Post,
      ),
      update: useFlexgetAPI(
        useCallback(
          (listId: number, entryId: number) => `/pending_list/${listId}/entries/${entryId}`,
          [],
        ),
        Method.Put,
      ),
      remove: useFlexgetAPI(
        useCallback(
          (listId: number, entryId: number) => `/pending_list/${listId}/entries/${entryId}`,
          [],
        ),
        Method.Delete,
      ),
      updateBulk: useFlexgetAPI(
        useCallback((listId: number) => `/pending_list/${listId}/entries/batch`, []),
        Method.Put,
      ),
      removeBulk: useFlexgetAPI(
        useCallback((listId: number) => `/pending_list/${listId}/entries/batch`, []),
        Method.Delete,
      ),
    },
  };
});

const PendingList: FC = () => {
  useInjectPageTitle('Pending List');

  return (
    <PendingListContainer.Provider>
      <ManagedList />
    </PendingListContainer.Provider>
  );
};

export default hot(PendingList);
