import React, { FC, useEffect } from 'react';
import { useContainer } from 'unstated-next';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { BaseProviders } from 'utils/tests';
import { makeRawEntry } from 'core/entry/fixtures';
import fetchMock from 'fetch-mock';
import { PendingListEntry } from 'plugins/pendingList/types';
import EntryCard from './EntryCard';
import { ListContainer, actions } from '../hooks/list';
import { EntryContainer } from '../hooks/entry';

const TestEntryCard: typeof EntryCard = props => {
  const [, dispatch] = useContainer(ListContainer);

  useEffect(() => {
    dispatch(actions.selectList(1));
  }, [dispatch]);

  return <EntryCard {...props} />;
};

const wrapper: FC = ({ children }) => (
  <BaseProviders>
    <ListContainer.Provider>
      <EntryContainer.Provider>{children}</EntryContainer.Provider>
    </ListContainer.Provider>
  </BaseProviders>
);

describe('plugins/pendingList/EntryList/EntryCard', () => {
  beforeEach(() => {
    fetchMock
      .put('glob:/api/pending_list/1/entries/*', {})
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

    it('should call onRemoveClick when remove pressed', () => {
      const { getByLabelText } = render(component, { wrapper });
      fireEvent.click(getByLabelText('remove'));
      expect(handleRemoveClick).toHaveBeenCalled();
    });

    it('should call onInjectClick when inject pressed', () => {
      const { getByLabelText } = render(component, { wrapper });
      fireEvent.click(getByLabelText('inject'));
      expect(handleInjectClick).toHaveBeenCalled();
    });
  });

  describe('remove entry', () => {
    const removedEntry: PendingListEntry = {
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
        entry={removedEntry}
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

    it('should call onRemoveClick when remove pressed', () => {
      const { getByLabelText } = render(component, { wrapper });
      fireEvent.click(getByLabelText('remove'));
      expect(handleRemoveClick).toHaveBeenCalled();
    });

    it('should call onInjectClick when inject pressed', () => {
      const { getByLabelText } = render(component, { wrapper });
      fireEvent.click(getByLabelText('inject'));
      expect(handleInjectClick).toHaveBeenCalled();
    });
  });
});
