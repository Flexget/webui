import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { renderWithWrapper } from 'utils/tests';
import fetchMock from 'fetch-mock';
import ShowCard from './ShowCard';
import { Show } from '../types';
import { ShowContainer } from '../hooks/shows';

const TestShowCard: typeof ShowCard = props => (
  <ShowContainer.Provider>
    <ShowCard {...props} />
  </ShowContainer.Provider>
);

describe('plugins/series/shows', () => {
  beforeEach(() => {
    fetchMock
      .get('glob:/api/tvdb/series/*', 404)
      .get('glob:/api/trakt/series/?*', 404)
      .get('glob:/api/tvmaze/series/*', 404)
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
  const handleRemoveClick = jest.fn();
  const component = <TestShowCard show={show} onRemoveClick={handleRemoveClick} />;

  it('should call onRemoveClick when remove pressed', () => {
    const { getByLabelText } = renderWithWrapper(component);
    fireEvent.click(getByLabelText('remove'));
    expect(handleRemoveClick).toHaveBeenCalled();
  });
});
