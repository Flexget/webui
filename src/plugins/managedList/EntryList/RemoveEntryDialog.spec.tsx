import React, { FC, useEffect } from 'react';
import { useContainer } from 'unstated-next';
import { cleanup, render, fireEvent, within, wait } from '@testing-library/react';
import { BaseProviders } from 'utils/tests';
import { makeRawEntry } from 'core/entry/fixtures';
import fetchMock from 'fetch-mock';
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

const wrapper: FC = ({ children }) => (
  <BaseProviders>
    <ListContainer.Provider>
      <EntryContainer.Provider>{children}</EntryContainer.Provider>
    </ListContainer.Provider>
  </BaseProviders>
);

describe('plugins/pendingList/EntryList/RemoveEntryDialog', () => {
  beforeEach(() => {
    fetchMock
      .delete('glob:/api/pending_list/1/entries/*', {})
      .get('/api/tasks', 200)
      .catch();
  });

  afterEach(() => {
    cleanup();
    fetchMock.reset();
  });

  const entry = makeRawEntry();

  const approvedEntry: Entry = {
    ...entry,
    id: 1,
    entry,
    listId: 1,
    addedOn: new Date().toUTCString(),
    // approved: true,
  };

  const handleClose = jest.fn();
  const component = <TestRemoveEntryDialog open onClose={handleClose} entryId={approvedEntry.id} />;

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
    expect(fetchMock.called('/api/pending_list/1/entries/1')).toBeTrue();
    await wait(() => expect(handleClose).toHaveBeenCalled());
  });

  it('should call close wehn pressing cancel', async () => {
    const { getByRole } = render(component, { wrapper });

    const submitButton = getByRole(
      (content, element) => content === 'button' && !!within(element).queryByText('Cancel'),
    );

    fireEvent.click(submitButton);
    expect(fetchMock.called('/api/pending_list/1/entries/1')).toBeFalse();
    expect(handleClose).toHaveBeenCalled();
  });
});
