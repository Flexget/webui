import React, { FC, useEffect } from 'react';
import { useContainer } from 'unstated-next';
import { cleanup, render, fireEvent, within, wait } from '@testing-library/react';
import { BaseProviders } from 'utils/tests';
import { makeRawEntry } from 'core/entry/fixtures';
import fetchMock from 'fetch-mock';
import { PendingListContainer } from 'plugins/lists/pending/hooks';
import { EntryListContainer } from 'plugins/lists/entry/hooks';
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
    name         | prefix            | Provider
    ${'pending'} | ${'pending_list'} | ${PendingListContainer.Provider}
    ${'entry'}   | ${'entry_list'}   | ${EntryListContainer.Provider}
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
        .delete(`glob:/api/${prefix}/1/entries/*`, {})
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
      addedOn: new Date().toUTCString(),
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
      expect(fetchMock.called(`/api/${prefix}/1/entries/1`)).toBeTrue();
      await wait(() => expect(handleClose).toHaveBeenCalled());
    });

    it('should call close when pressing cancel', async () => {
      const { getByRole } = render(component, { wrapper });

      const submitButton = getByRole(
        (content, element) => content === 'button' && !!within(element).queryByText('Cancel'),
      );

      fireEvent.click(submitButton);
      expect(fetchMock.called(`/api/${prefix}/1/entries/1`)).toBeFalse();
      expect(handleClose).toHaveBeenCalled();
    });
  });
});
