import { FC } from 'react';
import ManagedList from '../base';
import { PendingListContainer } from './hooks';

const PendingList: FC = () => {
  return (
    <PendingListContainer.Provider>
      <ManagedList title="Pending List" />
    </PendingListContainer.Provider>
  );
};

export default PendingList;
