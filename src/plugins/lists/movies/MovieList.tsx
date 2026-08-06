import { FC } from 'react';
import ManagedList from '../base';
import { MovieListContainer } from './hooks';

const PendingList: FC = () => {
  return (
    <MovieListContainer.Provider>
      <ManagedList title="Movie List" />
    </MovieListContainer.Provider>
  );
};

export default PendingList;
