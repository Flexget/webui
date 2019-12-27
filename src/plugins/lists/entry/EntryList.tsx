import React, { FC } from 'react';
import { hot } from 'react-hot-loader/root';
import ManagedList from '../base';
import { EntryListContainer } from './hooks';

const PendingList: FC = () => {
  return (
    <EntryListContainer.Provider>
      <ManagedList title="Entry List" />
    </EntryListContainer.Provider>
  );
};

export default hot(PendingList);
