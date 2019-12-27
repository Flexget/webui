import React, { FC, useEffect } from 'react';
import { useContainer } from 'unstated-next';
import { cleanup, render, fireEvent, within, wait } from '@testing-library/react';
import { BaseProviders } from 'utils/tests';
import fetchMock from 'fetch-mock';
import { TestContainer } from '../TestContainer';
import AddListDialog from './AddListDialog';
import { ListContainer, actions } from '../hooks/list';

const TestAddListDialog: typeof AddListDialog = props => {
  const [, dispatch] = useContainer(ListContainer);

  useEffect(() => {
    dispatch(actions.selectList(1));
  }, [dispatch]);

  return <AddListDialog {...props} />;
};

const wrapper: FC = ({ children }) => (
  <BaseProviders>
    <TestContainer.Provider>
      <ListContainer.Provider>{children}</ListContainer.Provider>
    </TestContainer.Provider>
  </BaseProviders>
);

describe('plugins/managedList/AddFab/AddListDialog', () => {
  beforeEach(() => {
    fetchMock
      .post('/api/managed_list', {})
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
  const component = <TestAddListDialog open onClose={handleClose} />;

  it('should find dialog when open', () => {
    const { queryByRole } = render(component, { wrapper });

    expect(queryByRole('dialog')).toBeInTheDocument();
  });

  it('should not find dialog when closed', () => {
    const { queryByRole } = render(<TestAddListDialog onClose={handleClose} />, { wrapper });

    expect(queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should call fetch when pressing add', async () => {
    const { getByRole } = render(component, { wrapper });

    const submitButton = getByRole(
      (content, element) => content === 'button' && !!within(element).queryByText('Add'),
    );

    fireEvent.click(submitButton);
    await wait(() => {
      expect(fetchMock.called('/api/managed_list')).toBeTrue();
      expect(handleClose).toHaveBeenCalled();
    });
  });

  it('should call close when pressing cancel', async () => {
    const { getByRole } = render(component, { wrapper });

    const cancelButton = getByRole(
      (content, element) => content === 'button' && !!within(element).queryByText('Cancel'),
    );

    fireEvent.click(cancelButton);
    expect(fetchMock.called('/api/managed_list')).toBeFalse();
    expect(handleClose).toHaveBeenCalled();
  });
});
