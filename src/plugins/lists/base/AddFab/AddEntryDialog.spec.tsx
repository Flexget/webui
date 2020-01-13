import React, { FC, useEffect } from 'react';
import { useContainer } from 'unstated-next';
import { cleanup, render, fireEvent, within, wait } from '@testing-library/react';
import { BaseProviders } from 'utils/tests';
import { makeRawEntry } from 'core/entry/fixtures';
import fetchMock from 'fetch-mock';
import { PendingListContainer } from 'plugins/lists/pending/hooks';
import { EntryListContainer } from 'plugins/lists/entry/hooks';
import { MovieListContainer } from 'plugins/lists/movies/hooks';
import AddEntryDialog from './AddEntryDialog';
import { ListContainer, actions } from '../hooks/list';
import { EntryContainer } from '../hooks/entry';
import { Entry } from '../types';

const TestAddEntryDialog: typeof AddEntryDialog = props => {
  const [, dispatch] = useContainer(ListContainer);

  useEffect(() => {
    dispatch(actions.selectList(1));
  }, [dispatch]);

  return <AddEntryDialog {...props} />;
};

describe('plugins/lists/base/AddFab/AddEntryDialog', () => {
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
    const rawEntry = makeRawEntry();
    const entry: Entry = {
      ...rawEntry,
      id: 1,
      entry: rawEntry,
      listId: 1,
      addedOn: new Date().toISOString(),
    };
    beforeEach(() => {
      fetchMock.post(`/api/${prefix}/1/${itemPrefix}`, entry).catch();
    });

    afterEach(() => {
      cleanup();
      fetchMock.reset();
    });

    const handleClose = jest.fn();
    const component = <TestAddEntryDialog open onClose={handleClose} />;

    it('should find dialog when open', () => {
      const { queryByRole } = render(component, { wrapper });

      expect(queryByRole('dialog')).toBeInTheDocument();
    });

    it('should not find dialog when closed', () => {
      const { queryByRole } = render(<TestAddEntryDialog onClose={handleClose} />, { wrapper });

      expect(queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should call fetch when pressing add', async () => {
      const { getByRole } = render(component, { wrapper });

      const submitButton = getByRole(
        (content, element) => content === 'button' && !!within(element).queryByText('Add'),
      );

      fireEvent.click(submitButton);
      await wait(() => {
        expect(fetchMock.called(`/api/${prefix}/1/${itemPrefix}`)).toBeTrue();
        expect(handleClose).toHaveBeenCalled();
      });
    });

    it('should call close when pressing cancel', () => {
      const { getByRole } = render(component, { wrapper });

      const cancelButton = getByRole(
        (content, element) => content === 'button' && !!within(element).queryByText('Cancel'),
      );

      fireEvent.click(cancelButton);
      expect(fetchMock.called(`/api/${prefix}/1/${itemPrefix}`)).toBeFalse();
      expect(handleClose).toHaveBeenCalled();
    });
  });
});
