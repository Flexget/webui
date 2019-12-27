import React, { FC } from 'react';
import { hot } from 'react-hot-loader/root';
import ManagedList from '../base';
import { PendingListContainer } from './hooks';

const PendingList: FC = () => {
  return (
    <PendingListContainer.Provider>
      <ManagedList title="Pending List" />
    </PendingListContainer.Provider>
  );
};

export default hot(PendingList);
