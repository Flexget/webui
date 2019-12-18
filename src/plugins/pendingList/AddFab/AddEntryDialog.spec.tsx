import React, { FC, useEffect } from 'react';
import { useContainer } from 'unstated-next';
import { cleanup, render, fireEvent, within, wait } from '@testing-library/react';
import { BaseProviders } from 'utils/tests';
import { makeRawEntry } from 'core/entry/fixtures';
import fetchMock from 'fetch-mock';
import AddEntryDialog from './AddEntryDialog';
import { ListContainer, actions } from '../hooks/list';
import { EntryContainer } from '../hooks/entry';
import { PendingListEntry } from '../types';

const TestAddEntryDialog: typeof AddEntryDialog = props => {
  const [, dispatch] = useContainer(ListContainer);

  useEffect(() => {
    dispatch(actions.selectList(1));
  }, [dispatch]);

  return <AddEntryDialog {...props} />;
};

const wrapper: FC = ({ children }) => (
  <BaseProviders>
    <ListContainer.Provider>
      <EntryContainer.Provider>{children}</EntryContainer.Provider>
    </ListContainer.Provider>
  </BaseProviders>
);

describe('plugins/pendingList/AddFab/AddEntryDialog', () => {
  const entry = makeRawEntry();
  const approvedEntry: PendingListEntry = {
    ...entry,
    id: 1,
    entry,
    listId: 1,
    addedOn: new Date().toUTCString(),
    approved: true,
  };
  beforeEach(() => {
    fetchMock
      .post('/api/pending_list/1/entries', approvedEntry)
      .get('/api/tasks', [
        { name: 'task 1' },
        {
          name: 'task 2',
        },
      ])
      .catch();
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
      expect(fetchMock.called('/api/pending_list/1/entries')).toBeTrue();
      expect(handleClose).toHaveBeenCalled();
    });
  });

  it('should call close wehn pressing cancel', async () => {
    const { getByRole } = render(component, { wrapper });

    const cancelButton = getByRole(
      (content, element) => content === 'button' && !!within(element).queryByText('Cancel'),
    );

    fireEvent.click(cancelButton);
    expect(fetchMock.called('/api/pending_list/1/entries')).toBeFalse();
    expect(handleClose).toHaveBeenCalled();
  });
});
