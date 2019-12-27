import React, { FC, useEffect } from 'react';
import { useContainer } from 'unstated-next';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { BaseProviders } from 'utils/tests';
import { makeRawEntry } from 'core/entry/fixtures';
import fetchMock from 'fetch-mock';
import EntryCard from './EntryCard';
import { ListContainer, actions } from '../hooks/list';
import { EntryContainer } from '../hooks/entry';
import { TestContainer } from '../TestContainer';
import { Entry } from '../types';

const TestEntryCard: typeof EntryCard = props => {
  const [, dispatch] = useContainer(ListContainer);

  useEffect(() => {
    dispatch(actions.selectList(1));
  }, [dispatch]);

  return <EntryCard {...props} />;
};

const wrapper: FC = ({ children }) => (
  <BaseProviders>
    <TestContainer.Provider>
      <ListContainer.Provider>
        <EntryContainer.Provider>{children}</EntryContainer.Provider>
      </ListContainer.Provider>
    </TestContainer.Provider>
  </BaseProviders>
);

describe('plugins/lists/base/EntryList/EntryCard', () => {
  beforeEach(() => {
    fetchMock
      .put('glob:/api/managed_list/1/entries/*', {})
      .delete('glob:/api/managed_list/1/entries/*', {})
      .get('/api/tasks', 200)
      .catch();
  });

  afterEach(() => {
    cleanup();
    fetchMock.reset();
  });
  const rawEntry = makeRawEntry();

  const entry: Entry = {
    ...rawEntry,
    id: 2,
    entry: rawEntry,
    listId: 1,
    addedOn: new Date().toUTCString(),
  };
  const handleInjectClick = jest.fn();
  const handleRemoveClick = jest.fn();
  const component = (
    <TestEntryCard
      entry={entry}
      onInjectClick={handleInjectClick}
      onRemoveClick={handleRemoveClick}
    />
  );

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
