import React from 'react';
import { cleanup, within } from '@testing-library/react';
import { renderWithWrapper } from 'utils/tests';
import { makeLogMessage } from './fixtures';
import { LogLevel } from './types';
import LogTable from './LogTable';

jest.mock('oboe');

describe('plugins/log/LogTable', () => {
  afterEach(() => {
    cleanup();
  });

  const messages = [
    makeLogMessage(),
    makeLogMessage(LogLevel.Error),
    makeLogMessage(LogLevel.Info),
    makeLogMessage(LogLevel.Critical),
  ];
  it('should have headers', () => {
    const { getAllByRole } = renderWithWrapper(<LogTable messages={messages} />);
    const headers = getAllByRole('columnheader');

    expect(headers).toHaveLength(5);
  });

  it('should have rows', async () => {
    const { getByLabelText } = renderWithWrapper(<LogTable messages={messages} />);
    const headers = await within(getByLabelText('grid')).findAllByRole('row');

    expect(headers).toHaveLength(4);
  });
});
