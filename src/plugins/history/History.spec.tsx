import React, { FC } from 'react';
import { cleanup } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { renderWithWrapper } from 'utils/tests';
import AppBar from 'core/layout/AppBar';
import { TaskContainer } from 'plugins/tasks/hooks';
import History from './History';

const TestHistory: FC = () => {
  return (
    <TaskContainer.Provider>
      <AppBar toggleSidebar={jest.fn()} />
      <History />
    </TaskContainer.Provider>
  );
};

describe('plugins/history', () => {
  beforeEach(() => {
    fetchMock.get('/api/tasks', []).get('glob:/api/history?*', []).catch();
  });

  afterEach(() => {
    cleanup();
    fetchMock.reset();
  });

  describe('contextual app bar', () => {
    it('should have title History', () => {
      const { queryByText } = renderWithWrapper(<TestHistory />);

      expect(queryByText('History', { selector: 'h6' })).toBeInTheDocument();
    });
  });
});
