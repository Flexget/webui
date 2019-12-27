import React, { FC } from 'react';
import { cleanup, fireEvent, within, getNodeText } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { renderWithWrapper } from 'utils/tests';
import AppBar from 'core/layout/AppBar';
import ManagedList from './index';

const TestPendingList: FC = () => {
  return (
    <>
      <AppBar toggleSidebar={jest.fn()} />
      <ManagedList />
    </>
  );
};

describe('plugins/pendingList/PendingList', () => {
  beforeEach(() => {
    fetchMock
      .get('/api/pending_list', [
        {
          id: 1,
          name: 'List 1',
          addedOn: new Date().toUTCString(),
        },
        {
          id: 2,
          name: 'List 2',
          addedOn: new Date().toUTCString(),
        },
      ])
      .get('glob:/api/pending_list/*/entries?*', [])
      .get('/api/tasks', [])
      .catch();
  });

  afterEach(() => {
    cleanup();
    fetchMock.reset();
  });

  describe('tabs', () => {
    it('should render tab list', async () => {
      const { getByRole } = renderWithWrapper(<TestPendingList />);
      const tablist = getByRole('tablist');
      const tabs = await within(tablist).findAllByRole('tab');
      expect(tabs).toHaveLength(2);

      expect(fetchMock.called('glob:/api/pending_list/1/entries?*')).toBeTrue();
      expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
      expect(tabs[0]).toHaveTextContent('List 1');
      expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
      expect(tabs[1]).toHaveTextContent('List 2');
    });

    it('should allow selecting a tab', async () => {
      const { getByRole } = renderWithWrapper(<TestPendingList />);
      const tablist = getByRole('tablist');
      const tabs = await within(tablist).findAllByRole('tab');
      fireEvent.click(tabs[1]);
      expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
      expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
      expect(fetchMock.called('glob:/api/pending_list/2/entries?*')).toBeTrue();
    });
  });

  describe('EntryListHeader', () => {
    it('should open a dialog when pressing remove list button', async () => {
      const { getByLabelText, queryByRole } = renderWithWrapper(<TestPendingList />);
      const removeListButton = getByLabelText('Remove List');
      fireEvent.click(removeListButton);
      expect(queryByRole('dialog')).toBeInTheDocument();
    });

    it('should change order when changing the value', async () => {
      const { findAllByRole, getByLabelText } = renderWithWrapper(<TestPendingList />);
      const dropdown = getByLabelText('Order');

      fireEvent.mouseDown(dropdown);
      const options = await findAllByRole('option');

      expect(options).toHaveLength(2);
      expect(dropdown).toHaveTextContent(getNodeText(options[0]));
      fireEvent.click(options[1]);
      expect(dropdown).toHaveTextContent(getNodeText(options[1]));
      expect(
        fetchMock.called(
          `glob:/api/pending_list/1/entries?*order=${options[1].getAttribute('data-value')}*`,
        ),
      ).toBeTrue();
    });

    it('should change sortBy when changing the value', async () => {
      const { findAllByRole, getByLabelText } = renderWithWrapper(<TestPendingList />);
      const dropdown = getByLabelText('Sort By');

      fireEvent.mouseDown(dropdown);
      const options = await findAllByRole('option');

      expect(options).toHaveLength(4);
      expect(dropdown).toHaveTextContent(getNodeText(options[0]));
      fireEvent.click(options[1]);
      expect(dropdown).toHaveTextContent(getNodeText(options[1]));
      expect(
        fetchMock.called(
          `glob:/api/pending_list/1/entries?*sort_by=${options[1].getAttribute('data-value')}*`,
        ),
      ).toBeTrue();
    });
  });
});
