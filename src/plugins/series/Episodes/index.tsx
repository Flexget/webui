import React, { FC } from 'react';
import { useInjectPageTitle } from 'core/layout/AppBar/hooks';
import { EpisodeContainer } from '../hooks/episodes';

const EpisodesPage: FC = () => {
  useInjectPageTitle('Episodes');

  return (
    <EpisodeContainer.Provider>
      <div />
    </EpisodeContainer.Provider>
  );
};

export default EpisodesPage;
