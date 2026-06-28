import React from 'react';
import { cleanup } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { renderWithWrapper } from 'utils/tests';
import { Direction } from 'utils/query';
import HistoryList from './HistoryList';
import { SortByFields, GroupByFields } from './types';

describe('plugins/history/HistoryList', () => {
  beforeEach(() => {
    fetchMock
      .get('glob:/api/history?*', [
        { task: 'task', id: 1, title: 'something', time: new Date('2017-09-09').toISOString() },
      ])
      .catch();
  });

  afterEach(() => {
    cleanup();
    fetchMock.reset();
  });

  it('renders correctly', async () => {
    const { findByText } = renderWithWrapper(
      <HistoryList
        options={{
          order: Direction.Desc,
          sort: SortByFields.Time,
          task: '',
          page: 1,
          grouping: GroupByFields.Time,
        }}
        loadMore={jest.fn()}
      />,
    );

    expect(await findByText('2017-09-09')).toBeInTheDocument();
  });
});
