import React, { FC, useEffect } from 'react';
import { useContainer } from 'unstated-next';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { BaseProviders } from 'utils/tests';
import { makeRawEntry } from 'core/entry/fixtures';
import fetchMock from 'fetch-mock';
import EntryCard from 'plugins/managedList/EntryList/EntryCard';
import { ListContainer, actions } from 'plugins/managedList/hooks/list';
import { EntryContainer } from 'plugins/managedList/hooks/entry';
import { PendingListEntry } from './types';
import { PendingListContainer } from './hooks';

const TestEntryCard: typeof EntryCard = props => {
  const [, dispatch] = useContainer(ListContainer);

  useEffect(() => {
    dispatch(actions.selectList(1));
  }, [dispatch]);

  return <EntryCard {...props} />;
};

const wrapper: FC = ({ children }) => (
  <BaseProviders>
    <PendingListContainer.Provider>
      <ListContainer.Provider>
        <EntryContainer.Provider>{children}</EntryContainer.Provider>
      </ListContainer.Provider>
    </PendingListContainer.Provider>
  </BaseProviders>
);

describe('plugins/pendingList/EntryList/EntryCard', () => {
  beforeEach(() => {
    fetchMock
      .put('glob:/api/pending_list/1/entries/*', {})
      .delete('glob:/api/pending_list/1/entries/*', {})
      .get('/api/tasks', 200)
      .catch();
  });

  afterEach(() => {
    cleanup();
    fetchMock.reset();
  });
  const entry = makeRawEntry();

  describe('approved entry', () => {
    const approvedEntry: PendingListEntry = {
      ...entry,
      id: 1,
      entry,
      listId: 1,
      addedOn: new Date().toUTCString(),
      approved: true,
    };
    const handleInjectClick = jest.fn();
    const handleRemoveClick = jest.fn();
    const component = (
      <TestEntryCard
        entry={approvedEntry}
        onInjectClick={handleInjectClick}
        onRemoveClick={handleRemoveClick}
      />
    );

    it('should render approvedEntry properly', () => {
      const { queryByText } = render(component, { wrapper });

      expect(queryByText('Approved')).toBeInTheDocument();
    });

    it('should call endpoint when pressing reject', () => {
      const { getByLabelText } = render(component, { wrapper });
      fireEvent.click(getByLabelText('reject'));
      expect(fetchMock.called('/api/pending_list/1/entries/1')).toBeTrue();
    });
  });

  describe('rejected entry', () => {
    const rejectedEntry: PendingListEntry = {
      ...entry,
      id: 2,
      entry,
      listId: 1,
      addedOn: new Date().toUTCString(),
      approved: false,
    };
    const handleInjectClick = jest.fn();
    const handleRemoveClick = jest.fn();
    const component = (
      <TestEntryCard
        entry={rejectedEntry}
        onInjectClick={handleInjectClick}
        onRemoveClick={handleRemoveClick}
      />
    );

    it('should render approvedEntry properly', () => {
      const { queryByText } = render(component, { wrapper });

      expect(queryByText('Approved')).not.toBeInTheDocument();
    });

    it('should call endpoint when pressing approve', () => {
      const { getByLabelText } = render(component, { wrapper });
      fireEvent.click(getByLabelText('approve'));

      expect(fetchMock.called('/api/pending_list/1/entries/2')).toBeTrue();
    });
  });
});
