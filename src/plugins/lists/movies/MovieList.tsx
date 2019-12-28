import React, { FC } from 'react';
import { hot } from 'react-hot-loader/root';
import ManagedList from '../base';
import { MovieListContainer } from './hooks';

const PendingList: FC = () => {
  return (
    <MovieListContainer.Provider>
      <ManagedList title="Entry List" />
    </MovieListContainer.Provider>
  );
};

export default hot(PendingList);
