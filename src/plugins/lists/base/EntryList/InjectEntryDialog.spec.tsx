import React, { FC, useEffect } from 'react';
import { useContainer } from 'unstated-next';
import { cleanup, render, fireEvent, within, wait } from '@testing-library/react';
import { BaseProviders } from 'utils/tests';
import { makeRawEntry } from 'core/entry/fixtures';
import fetchMock from 'fetch-mock';
import { PendingListContainer } from 'plugins/lists/pending/hooks';
import { EntryListContainer } from 'plugins/lists/entry/hooks';
import { MovieListContainer } from 'plugins/lists/movies/hooks';
import { TaskContainer } from 'plugins/tasks/hooks';
import InjectEntryDialog from './InjectEntryDialog';
import { ListContainer, actions } from '../hooks/list';
import { EntryContainer } from '../hooks/entry';
import { Entry } from '../types';

const TestInjectEntryDialog: typeof InjectEntryDialog = props => {
  const [, dispatch] = useContainer(ListContainer);

  useEffect(() => {
    dispatch(actions.selectList(1));
  }, [dispatch]);

  return <InjectEntryDialog {...props} />;
};

describe('plugins/lists/base/EntryList/InjectEntryDialog', () => {
  describe.each`
    name         | prefix            | itemPrefix   | Provider
    ${'pending'} | ${'pending_list'} | ${'entries'} | ${PendingListContainer.Provider}
    ${'entry'}   | ${'entry_list'}   | ${'entries'} | ${EntryListContainer.Provider}
    ${'movie'}   | ${'movie_list'}   | ${'movies'}  | ${MovieListContainer.Provider}
  `('$name', ({ prefix, Provider, itemPrefix }) => {
    const wrapper: FC = ({ children }) => (
      <BaseProviders>
        <TaskContainer.Provider>
          <Provider>
            <ListContainer.Provider>
              <EntryContainer.Provider>{children}</EntryContainer.Provider>
            </ListContainer.Provider>
          </Provider>
        </TaskContainer.Provider>
      </BaseProviders>
    );
    beforeEach(() => {
      fetchMock
        .delete(`glob:/api/${prefix}/1/${itemPrefix}/*`, {})
        .get('/api/tasks', [
          { name: 'task 1' },
          {
            name: 'task 2',
          },
        ])
        .post('/api/tasks/execute', 200)
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
    const component = <TestInjectEntryDialog open onClose={handleClose} entryId={entry.id} />;

    it('should find dialog when open', () => {
      const { queryByRole } = render(component, { wrapper });

      expect(queryByRole('dialog')).toBeInTheDocument();
    });

    it('should not find dialog when closed', () => {
      const { queryByRole } = render(<TestInjectEntryDialog onClose={handleClose} />, { wrapper });

      expect(queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should call fetch when pressing inject', async () => {
      const { getByRole } = render(component, { wrapper });

      const submitButton = getByRole(
        (content, element) => content === 'button' && !!within(element).queryByText('Inject'),
      );

      fireEvent.click(submitButton);
      await wait(() => {
        expect(fetchMock.called(`/api/${prefix}/1/${itemPrefix}/1`)).toBeTrue();
        expect(fetchMock.called('/api/tasks/execute')).toBeTrue();
        expect(handleClose).toHaveBeenCalled();
      });
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
