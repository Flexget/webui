import React, { FC, useEffect } from 'react';
import { useContainer } from 'unstated-next';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { BaseProviders } from 'utils/tests';
import { makeRawEntry } from 'core/entry/fixtures';
import fetchMock from 'fetch-mock';
import { EntryListContainer } from 'plugins/lists/entry/hooks';
import { PendingListContainer } from 'plugins/lists/pending/hooks';
import EntryCard from './EntryCard';
import { ListContainer, actions } from '../hooks/list';
import { EntryContainer } from '../hooks/entry';
import { Entry } from '../types';
import { MovieListContainer } from '../../movies/hooks';

const TestEntryCard: typeof EntryCard = props => {
  const [, dispatch] = useContainer(ListContainer);

  useEffect(() => {
    dispatch(actions.selectList(1));
  }, [dispatch]);

  return <EntryCard {...props} />;
};

describe('plugins/lists/base/EntryList/EntryCard', () => {
  describe.each`
    name         | prefix            | itemPrefix   | Provider
    ${'pending'} | ${'pending_list'} | ${'entries'} | ${PendingListContainer.Provider}
    ${'entry'}   | ${'entry_list'}   | ${'entries'} | ${EntryListContainer.Provider}
    ${'movie'}   | ${'movie_list'}   | ${'movies'}  | ${MovieListContainer.Provider}
  `('$name', ({ prefix, Provider }) => {
    const wrapper: FC = ({ children }) => (
      <BaseProviders>
        <Provider>
          <ListContainer.Provider>
            <EntryContainer.Provider>{children}</EntryContainer.Provider>
          </ListContainer.Provider>
        </Provider>
      </BaseProviders>
    );
    beforeEach(() => {
      fetchMock
        .put(`glob:/api/${prefix}/1/entries/*`, {})
        .delete(`glob:/api/{prefix}/1/entries/*`, {})
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
});
