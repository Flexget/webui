import { FC } from 'react';
import ManagedList from '../base';
import { EntryListContainer } from './hooks';

const PendingList: FC = () => {
  return (
    <EntryListContainer.Provider>
      <ManagedList title="Entry List" />
    </EntryListContainer.Provider>
  );
};

export default PendingList;
