import React, { FC } from 'react';
import { cleanup, fireEvent, getNodeText, wait } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { renderWithWrapper } from 'utils/tests';
import AppBar from 'core/layout/AppBar';
import Shows from './index';

const TestShows: FC = () => {
  return (
    <>
      <AppBar toggleSidebar={jest.fn()} />
      <Shows />
    </>
  );
};

describe('plugins/series/shows', () => {
  beforeEach(() => {
    fetchMock
      .get('glob:/api/series?*', [])
      .get('/api/tasks', [])
      .catch();
  });

  afterEach(() => {
    cleanup();
    fetchMock.reset();
  });

  describe('Header', () => {
    it('should change order when changing the value', async () => {
      const { findAllByRole, getByLabelText } = renderWithWrapper(<TestShows />);
      const dropdown = getByLabelText('Order');

      fireEvent.mouseDown(dropdown);
      const options = await findAllByRole('option');

      expect(options).toHaveLength(2);
      expect(dropdown).toHaveTextContent(getNodeText(options[0]));
      fireEvent.click(options[1]);
      expect(dropdown).toHaveTextContent(getNodeText(options[1]));
      await wait(() =>
        expect(
          fetchMock.called(`glob:/api/series?*order=${options[1].getAttribute('data-value')}*`),
        ).toBeTrue(),
      );
    });

    it('should change config when changing the value', async () => {
      const { findAllByRole, getByLabelText } = renderWithWrapper(<TestShows />);
      const dropdown = getByLabelText('Configured');

      fireEvent.mouseDown(dropdown);
      const options = await findAllByRole('option');

      expect(options).toHaveLength(3);
      expect(dropdown).toHaveTextContent(getNodeText(options[0]));
      fireEvent.click(options[1]);
      expect(dropdown).toHaveTextContent(getNodeText(options[1]));
      await wait(() =>
        expect(
          fetchMock.called(`glob:/api/series?*in_config=${options[1].getAttribute('data-value')}*`),
        ).toBeTrue(),
      );
    });

    it('should change sortBy when changing the value', async () => {
      const { findAllByRole, getByLabelText } = renderWithWrapper(<TestShows />);
      const dropdown = getByLabelText('Sort By');

      fireEvent.mouseDown(dropdown);
      const options = await findAllByRole('option');

      expect(options).toHaveLength(2);
      expect(dropdown).toHaveTextContent(getNodeText(options[0]));
      fireEvent.click(options[1]);
      expect(dropdown).toHaveTextContent(getNodeText(options[1]));
      await wait(() =>
        expect(
          fetchMock.called(`glob:/api/series?*sort_by=${options[1].getAttribute('data-value')}*`),
        ).toBeTrue(),
      );
    });
  });
});
