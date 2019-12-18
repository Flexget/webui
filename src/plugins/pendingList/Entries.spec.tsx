import React, { FC } from 'react';
import { useContainer } from 'unstated-next';
import { cleanup, fireEvent, within } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { renderWithWrapper } from 'utils/tests';
import { AppBarContainer } from 'core/layout/AppBar/hooks';
import Entries from './Entries';
import { ListContainer } from './hooks/list';

const TestEntries: FC = () => {
  const [{ content }] = useContainer(AppBarContainer);

  return (
    <ListContainer.Provider>
      {content}
      <Entries />
    </ListContainer.Provider>
  );
};

describe('plugins/pendingList/Entries', () => {
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
      const { getByRole } = renderWithWrapper(<TestEntries />);
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
      const { getByRole } = renderWithWrapper(<TestEntries />);
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
      const { getByText, queryByRole } = renderWithWrapper(<TestEntries />);
      const removeListButton = getByText('Remove List');
      fireEvent.click(removeListButton);
      expect(queryByRole('dialog')).toBeInTheDocument();
    });
  });
  describe('EntryList', () => {});
  describe('AddFab', () => {});
});
