import React, { FC } from 'react';
import { cleanup } from '@testing-library/react';
import { renderWithWrapper } from 'utils/tests';
import AppBar from 'core/layout/AppBar';
import Log from './Log';

jest.mock('oboe');

const TestLog: FC = () => {
  return (
    <>
      <AppBar toggleSidebar={jest.fn()} />
      <Log />
    </>
  );
};

describe('plugins/log', () => {
  afterEach(() => {
    cleanup();
  });

  describe('contextual app bar', () => {
    it('should have title Log', () => {
      const { queryByText } = renderWithWrapper(<TestLog />);

      expect(queryByText('Log', { selector: 'h6' })).toBeInTheDocument();
    });
  });
});
