import React, { FC, useEffect } from 'react';
import { useContainer } from 'unstated-next';
import { cleanup, render, fireEvent, within, wait } from '@testing-library/react';
import { BaseProviders } from 'utils/tests';
import fetchMock from 'fetch-mock';
import RemoveListDialog from './RemoveListDialog';
import { ListContainer, actions } from './hooks/list';
import { PendingListContainer } from '../pending/hooks';
import { EntryListContainer } from '../entry/hooks';
import { MovieListContainer } from '../movies/hooks';

const TestRemoveListDialog: typeof RemoveListDialog = props => {
  const [, dispatch] = useContainer(ListContainer);

  useEffect(() => {
    dispatch(actions.selectList(1));
  }, [dispatch]);

  return <RemoveListDialog {...props} />;
};

describe('plugins/lists/base/EntryListHeader/RemoveListDialog', () => {
  describe.each`
    name         | prefix            | Provider
    ${'pending'} | ${'pending_list'} | ${PendingListContainer.Provider}
    ${'entry'}   | ${'entry_list'}   | ${EntryListContainer.Provider}
    ${'movie'}   | ${'movie_list'}   | ${MovieListContainer.Provider}
  `('$name', ({ prefix, Provider }) => {
    const wrapper: FC = ({ children }) => (
      <BaseProviders>
        <Provider>
          <ListContainer.Provider>{children}</ListContainer.Provider>
        </Provider>
      </BaseProviders>
    );
    beforeEach(() => {
      fetchMock
        .delete(`glob:/api/${prefix}/*`, {})
        .get('/api/tasks', 200)
        .catch();
    });

    afterEach(() => {
      cleanup();
      fetchMock.reset();
    });

    const handleClose = jest.fn();
    const component = <TestRemoveListDialog open onClose={handleClose} />;

    it('should find dialog when open', () => {
      const { queryByRole } = render(component, { wrapper });

      expect(queryByRole('dialog')).toBeInTheDocument();
    });

    it('should not find dialog when closed', () => {
      const { queryByRole } = render(<TestRemoveListDialog onClose={handleClose} />, { wrapper });

      expect(queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should call fetch when pressing remove', async () => {
      const { getByRole } = render(component, { wrapper });

      const submitButton = getByRole(
        (content, element) => content === 'button' && !!within(element).queryByText('Remove'),
      );

      fireEvent.click(submitButton);
      expect(fetchMock.called(`/api/${prefix}/1`)).toBeTrue();
      await wait(() => expect(handleClose).toHaveBeenCalled());
    });

    it('should call close when pressing cancel', () => {
      const { getByRole } = render(component, { wrapper });

      const submitButton = getByRole(
        (content, element) => content === 'button' && !!within(element).queryByText('Cancel'),
      );

      fireEvent.click(submitButton);
      expect(fetchMock.called(`/api/${prefix}/1`)).toBeFalse();
      expect(handleClose).toHaveBeenCalled();
    });
  });
});
