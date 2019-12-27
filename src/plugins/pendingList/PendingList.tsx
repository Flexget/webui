import React, { FC } from 'react';
import { hot } from 'react-hot-loader/root';
import { useInjectPageTitle } from 'core/layout/AppBar/hooks';
import ManagedList from 'plugins/managedList';
import { PendingListContainer } from './hooks';

const PendingList: FC = () => {
  useInjectPageTitle('Pending List');

  return (
    <PendingListContainer.Provider>
      <ManagedList />
    </PendingListContainer.Provider>
  );
};

export default hot(PendingList);
