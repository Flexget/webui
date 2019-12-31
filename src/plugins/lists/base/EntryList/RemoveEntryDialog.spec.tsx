import React, { FC, useEffect } from 'react';
import { useContainer } from 'unstated-next';
import { cleanup, render, fireEvent, within, wait } from '@testing-library/react';
import { BaseProviders } from 'utils/tests';
import { makeRawEntry } from 'core/entry/fixtures';
import fetchMock from 'fetch-mock';
import { PendingListContainer } from 'plugins/lists/pending/hooks';
import { EntryListContainer } from 'plugins/lists/entry/hooks';
import { MovieListContainer } from 'plugins/lists/movies/hooks';
import RemoveEntryDialog from './RemoveEntryDialog';
import { ListContainer, actions } from '../hooks/list';
import { EntryContainer } from '../hooks/entry';
import { Entry } from '../types';

const TestRemoveEntryDialog: typeof RemoveEntryDialog = props => {
  const [, dispatch] = useContainer(ListContainer);

  useEffect(() => {
    dispatch(actions.selectList(1));
  }, [dispatch]);

  return <RemoveEntryDialog {...props} />;
};

describe('plugins/lists/base/EntryList/RemoveEntryDialog', () => {
  describe.each`
    name         | prefix            | itemPrefix   | Provider
    ${'pending'} | ${'pending_list'} | ${'entries'} | ${PendingListContainer.Provider}
    ${'entry'}   | ${'entry_list'}   | ${'entries'} | ${EntryListContainer.Provider}
    ${'movie'}   | ${'movie_list'}   | ${'movies'}  | ${MovieListContainer.Provider}
  `('$name', ({ prefix, Provider, itemPrefix }) => {
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
        .delete(`glob:/api/${prefix}/1/${itemPrefix}/*`, {})
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
      id: 1,
      entry: rawEntry,
      listId: 1,
      addedOn: new Date().toISOString(),
    };

    const handleClose = jest.fn();
    const component = <TestRemoveEntryDialog open onClose={handleClose} entryId={entry.id} />;

    it('should find dialog when open', () => {
      const { queryByRole } = render(component, { wrapper });

      expect(queryByRole('dialog')).toBeInTheDocument();
    });

    it('should not find dialog when closed', () => {
      const { queryByRole } = render(<TestRemoveEntryDialog onClose={handleClose} />, { wrapper });

      expect(queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should call fetch when pressing remove', async () => {
      const { getByRole } = render(component, { wrapper });

      const submitButton = getByRole(
        (content, element) => content === 'button' && !!within(element).queryByText('Remove'),
      );

      fireEvent.click(submitButton);
      expect(fetchMock.called(`/api/${prefix}/1/${itemPrefix}/1`)).toBeTrue();
      await wait(() => expect(handleClose).toHaveBeenCalled());
    });

    it('should call close when pressing cancel', () => {
      const { getByRole } = render(component, { wrapper });

      const submitButton = getByRole(
        (content, element) => content === 'button' && !!within(element).queryByText('Cancel'),
      );

      fireEvent.click(submitButton);
      expect(fetchMock.called(`/api/${prefix}/1/${itemPrefix}/1`)).toBeFalse();
      expect(handleClose).toHaveBeenCalled();
    });
  });
});
