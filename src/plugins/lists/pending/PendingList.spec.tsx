import React, { FC } from 'react';
import { cleanup } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { renderWithWrapper } from 'utils/tests';
import AppBar from 'core/layout/AppBar';
import { TaskContainer } from 'plugins/tasks/hooks';
import PendingList from './PendingList';

const TestPendingList: FC = () => {
  return (
    <TaskContainer.Provider>
      <AppBar toggleSidebar={jest.fn()} />
      <PendingList />
    </TaskContainer.Provider>
  );
};

describe('plugins/lists/pending', () => {
  beforeEach(() => {
    fetchMock
      .get('/api/pending_list', [])
      .get('glob:/api/pending_list/*/entries?*', [])
      .get('/api/tasks', [])
      .catch();
  });

  afterEach(() => {
    cleanup();
    fetchMock.reset();
  });

  describe('contextual app bar', () => {
    it('should have title Managed List', () => {
      const { queryByText } = renderWithWrapper(<TestPendingList />);

      expect(queryByText('Pending List', { selector: 'h6' })).toBeInTheDocument();
    });
  });
});
