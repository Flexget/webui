import React, { FC } from 'react';
import { cleanup } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { renderWithWrapper } from 'utils/tests';
import AppBar from 'core/layout/AppBar';
import EntryList from './MovieList';

const TestEntryList: FC = () => {
  return (
    <>
      <AppBar toggleSidebar={jest.fn()} />
      <EntryList />
    </>
  );
};

describe('plugins/lists/base', () => {
  beforeEach(() => {
    fetchMock
      .get('/api/entry_list', [])
      .get('glob:/api/entry_list/*/entries?*', [])
      .get('/api/tasks', [])
      .catch();
  });

  afterEach(() => {
    cleanup();
    fetchMock.reset();
  });

  describe('contextual app bar', () => {
    it('should have title Managed List', () => {
      const { queryByText } = renderWithWrapper(<TestEntryList />);

      expect(queryByText('Entry List', { selector: 'h6' })).toBeInTheDocument();
    });
  });
});
