import React from 'react';
import fetchMock from 'fetch-mock';
import { cleanup } from '@testing-library/react';
import { renderWithWrapper } from 'utils/tests';
import Card from './Card';

describe('plugins/tasks/Card', () => {
  beforeEach(() => {
    fetchMock
      .get('glob:/api/tasks/status?*', [
        {
          id: 2,
          name: 'task',
          lastExecutionTime: new Date(2020, 4, 12).toISOString(),
        },
      ])
      .get('glob:/api/tasks/queue', [
        {
          id: 1,
          name: 'task',
          currentPhase: 'phase',
          currentPlugin: 'plugin',
        },
      ])
      .catch();
  });

  afterEach(() => {
    cleanup();
    fetchMock.reset();
  });

  it('should render task queue quanity', async () => {
    const { findByText } = renderWithWrapper(<Card />);

    expect(await findByText('1 in Queue')).toBeInTheDocument();
  });

  it('should have the right plugin executing ', async () => {
    const { findByText } = renderWithWrapper(<Card />);

    const el = (await findByText('Currently Executing')).closest('p');
    expect(el).toBeInTheDocument();
    expect(el).toHaveTextContent(': task');
  });

  it('should display last task execution properly ', async () => {
    const { findByText } = renderWithWrapper(<Card />);

    const el = (await findByText('Last Task Execution')).closest('p');
    expect(el).toBeInTheDocument();
    expect(el).toHaveTextContent(': task (5/12/2020, 12:00:00 AM)');
  });
});
