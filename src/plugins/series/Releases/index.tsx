import React, { FC } from 'react';
import { useInjectPageTitle } from 'core/layout/AppBar/hooks';
import { ReleaseContainer } from '../hooks/releases';

const ReleasesPage: FC = () => {
  useInjectPageTitle('Releases');

  return (
    <ReleaseContainer.Provider>
      <div />
    </ReleaseContainer.Provider>
  );
};

export default ReleasesPage;
