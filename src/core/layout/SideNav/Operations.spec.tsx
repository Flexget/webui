import React, { FC } from 'react';
import fetchMock from 'fetch-mock';
import { cleanup, fireEvent, RenderResult } from '@testing-library/react';
import { renderWithWrapper } from 'utils/tests';
import InfoStatus from 'core/status/InfoStatus';
import { DatabaseOperation } from 'core/layout/SideNav/hooks';
import Operations from './Operations';

interface Props {
  open?: boolean;
}

const TestOperations: FC<Props> = ({ open = false }) => {
  return (
    <>
      <InfoStatus />
      <Operations open={open} onClose={jest.fn()} />
    </>
  );
};

const buttonsDisabled = (getByText: RenderResult['getByText']) => {
  expect(getByText('Cleanup', { selector: 'span' }).closest('button')).toBeDisabled();
  expect(getByText('Vacuum', { selector: 'span' }).closest('button')).toBeDisabled();
  expect(getByText('Reset Plugin', { selector: 'span' }).closest('button')).toBeDisabled();
};

describe('core/layout/SideNav/Operations', () => {
  beforeEach(() => {
    fetchMock
      .get('/api/database/plugins', ['plugin', 'another_plugin'])
      .post('/api/database', { message: 'success' })
      .catch();
  });

  afterEach(() => {
    cleanup();
    fetchMock.reset();
  });

  it('should render operations drawer if open', () => {
    const { queryByRole } = renderWithWrapper(<TestOperations open />);

    expect(queryByRole('presentation')).toBeInTheDocument();
  });

  it('should not render operations drawer if closed', () => {
    const { queryByRole } = renderWithWrapper(<TestOperations />);

    expect(queryByRole('presentation')).not.toBeInTheDocument();
  });

  describe('cleanup', () => {
    it('should make request when clicked', () => {
      const { getByText } = renderWithWrapper(<TestOperations open />);
      const button = getByText('Cleanup', { selector: 'span' }).closest('button');

      if (button) {
        fireEvent.click(button);
      }

      expect(
        fetchMock.called('/api/database', {
          body: { operation: DatabaseOperation.Cleanup },
        }),
      ).toBeTrue();
      buttonsDisabled(getByText);
    });
  });

  describe('vacuum', () => {
    it('should make request when clicked', () => {
      const { getByText } = renderWithWrapper(<TestOperations open />);
      const button = getByText('Vacuum', { selector: 'span' }).closest('button');

      if (button) {
        fireEvent.click(button);
      }
      expect(
        fetchMock.called('/api/database', {
          body: { operation: DatabaseOperation.Vacuum },
        }),
      ).toBeTrue();
      buttonsDisabled(getByText);
    });
  });

  describe('plugin reset', () => {
    it('should make request when clicked', async () => {
      const { getByLabelText, getByText, findAllByRole } = renderWithWrapper(
        <TestOperations open />,
      );
      const button = getByText('Reset Plugin', { selector: 'span' }).closest('button');

      const dropdown = getByLabelText('Plugin name');

      fireEvent.mouseDown(dropdown);

      const options = await findAllByRole('option');

      expect(options).toHaveLength(2);
      fireEvent.click(options[1]);

      if (button) {
        fireEvent.click(button);
      }

      expect(
        fetchMock.called('/api/database', {
          body: { operation: DatabaseOperation.PluginReset, plugin_name: 'another_plugin' }, // eslint-disable-line @typescript-eslint/camelcase
        }),
      ).toBeTrue();
      buttonsDisabled(getByText);
    });
  });
});
