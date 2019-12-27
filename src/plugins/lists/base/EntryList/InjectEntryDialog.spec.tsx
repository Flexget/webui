import React, { FC, useEffect } from 'react';
import { useContainer } from 'unstated-next';
import { cleanup, render, fireEvent, within, wait } from '@testing-library/react';
import { BaseProviders } from 'utils/tests';
import { makeRawEntry } from 'core/entry/fixtures';
import fetchMock from 'fetch-mock';
import InjectEntryDialog from './InjectEntryDialog';
import { ListContainer, actions } from '../hooks/list';
import { EntryContainer } from '../hooks/entry';
import { Entry } from '../types';
import { TestContainer } from '../TestContainer';

const TestInjectEntryDialog: typeof InjectEntryDialog = props => {
  const [, dispatch] = useContainer(ListContainer);

  useEffect(() => {
    dispatch(actions.selectList(1));
  }, [dispatch]);

  return <InjectEntryDialog {...props} />;
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

describe('plugins/managedList/EntryList/InjectEntryDialog', () => {
  beforeEach(() => {
    fetchMock
      .delete('glob:/api/managed_list/1/entries/*', {})
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
    addedOn: new Date().toUTCString(),
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
      expect(fetchMock.called('/api/managed_list/1/entries/1')).toBeTrue();
      expect(fetchMock.called('/api/tasks/execute')).toBeTrue();
      expect(handleClose).toHaveBeenCalled();
    });
  });

  it('should call close wehn pressing cancel', async () => {
    const { getByRole } = render(component, { wrapper });

    const submitButton = getByRole(
      (content, element) => content === 'button' && !!within(element).queryByText('Cancel'),
    );

    fireEvent.click(submitButton);
    expect(fetchMock.called('/api/managed_list/1/entries/1')).toBeFalse();
    expect(handleClose).toHaveBeenCalled();
  });
});
