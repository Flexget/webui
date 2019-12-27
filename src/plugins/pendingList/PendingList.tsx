import React, { FC } from 'react';
import { hot } from 'react-hot-loader/root';
import { useInjectPageTitle } from 'core/layout/AppBar/hooks';
import { createPluginContainer } from 'plugins/managedList/hooks/api';
import { useFlexgetAPI } from 'core/api';
import { Method } from 'utils/fetch';
import { List } from 'plugins/managedList/types';
import ManagedList from 'plugins/managedList';

const PendingListContainer = createPluginContainer(() => {
  return {
    list: {
      get: useFlexgetAPI<List[]>('/pending_list'),
      add: useFlexgetAPI<List>('/pending_list', Method.Post),
      remove: useFlexgetAPI((listId: number) => `/pending_list/${listId}`, Method.Delete),
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
