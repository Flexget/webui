import React, { FC } from 'react';
import { cleanup } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { renderWithWrapper } from 'utils/tests';
import AppBar from 'core/layout/AppBar';
import { TaskContainer } from 'plugins/tasks/hooks';
import EntryList from './EntryList';

const TestEntryList: FC = () => {
  return (
    <TaskContainer.Provider>
      <AppBar toggleSidebar={jest.fn()} />
      <EntryList />
    </TaskContainer.Provider>
  );
};

describe('plugins/lists/entry', () => {
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
