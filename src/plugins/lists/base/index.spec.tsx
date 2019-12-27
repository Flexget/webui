import React, { FC } from 'react';
import { cleanup } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { renderWithWrapper } from 'utils/tests';
import AppBar from 'core/layout/AppBar';
import ManagedList from './index';
import { TestContainer } from './TestContainer';

const TestManagedList: FC = () => {
  return (
    <>
      <AppBar toggleSidebar={jest.fn()} />
      <TestContainer.Provider>
        <ManagedList title="Managed List" />
      </TestContainer.Provider>
    </>
  );
};

describe('plugins/lists/base', () => {
  beforeEach(() => {
    fetchMock
      .get('/api/managed_list', [])
      .get('glob:/api/managed_list/*/entries?*', [])
      .get('/api/tasks', [])
      .catch();
  });

  afterEach(() => {
    cleanup();
    fetchMock.reset();
  });

  describe('contextual app bar', () => {
    it('should have title Managed List', () => {
      const { queryByText } = renderWithWrapper(<TestManagedList />);

      expect(queryByText('Managed List', { selector: 'h6' })).toBeInTheDocument();
    });
  });
});
