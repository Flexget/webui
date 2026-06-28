import React from 'react';
import fetchMock from 'fetch-mock';
import { renderWithWrapper } from 'utils/tests';
import Releases from './Releases';
import { ReleaseContainer } from '../hooks/releases';
import { Release } from '../types';

const release: Release = {
  downloaded: true,
  firstSeen: new Date().toUTCString(),
  id: 3,
  properCount: 0,
  quality: '720p webdl h264',
  title: 'A Tv Show Episode',
  episodeId: 2,
};

const TestReleases: typeof Releases = props => (
  <ReleaseContainer.Provider>
    <Releases {...props} />
  </ReleaseContainer.Provider>
);

describe('series/episodes/Releases', () => {
  beforeEach(() => {
    fetchMock.get('glob:/api/series/1/episodes/2/releases?*', [release]).catch();
  });

  it('should render properly', async () => {
    const { findByText } = renderWithWrapper(<TestReleases showId={1} episodeId={2} />);

    expect(await findByText(release.title)).toBeInTheDocument();
  });
});
