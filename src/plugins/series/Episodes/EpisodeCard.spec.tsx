import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { renderWithWrapper } from 'utils/tests';
import fetchMock from 'fetch-mock';
import EpisodeCard from './EpisodeCard';
import { Episode, Show, IdentifiedBy } from '../types';
import { EpisodeContainer } from '../hooks/episodes';
import { ReleaseContainer } from '../hooks/releases';

const TestEpisodeCard: typeof EpisodeCard = props => (
  <EpisodeContainer.Provider>
    <ReleaseContainer.Provider>
      <EpisodeCard {...props} />
    </ReleaseContainer.Provider>
  </EpisodeContainer.Provider>
);

describe('plugins/series/episodes', () => {
  beforeEach(() => {
    fetchMock
      .get('/api/tasks', 200)
      .get('glob:/api/tvdb/series/*', 404)
      .get('glob:/api/tvdb/episode/*', 404)
      .get('glob:/api/trakt/series/?*', 404)
      .get('glob:/api/tvmaze/series/*', 404)
      .get('glob:/api/tvmaze/episode/*', 404)
      .put('glob:/api/series/2/episodes/3/releases', 200)
      .catch();
  });

  afterEach(() => {
    cleanup();
    fetchMock.reset();
  });

  const show: Show = {
    name: 'show 1',
    id: 2,
    alternateNames: [],
    inTasks: ['task 1'],
  };

  const episode: Episode = {
    firstSeen: new Date().toUTCString(),
    seriesId: 1,
    id: 3,
    identifier: 'S01E01',
    season: 1,
    number: 1,
    numberOfReleases: 0,
    premier: false,
    identifiedBy: IdentifiedBy.Ep,
  };
  const handleRemoveClick = jest.fn();
  const component = (
    <TestEpisodeCard show={show} episode={episode} onRemoveClick={handleRemoveClick} />
  );

  it('should call onRemoveClick when remove pressed', () => {
    const { getByText } = renderWithWrapper(component);
    fireEvent.click(getByText('Delete Episode'));
    expect(handleRemoveClick).toHaveBeenCalled();
  });

  it('should endpoint with pressing update releases', () => {
    const { getByText } = renderWithWrapper(component);
    fireEvent.click(getByText('Reset Releases'));
    expect(fetchMock.called('/api/series/2/episodes/3/releases')).toBeTrue();
  });
});
