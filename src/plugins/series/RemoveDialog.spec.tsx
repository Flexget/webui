import React from 'react';
import { cleanup, fireEvent, within, wait } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { renderWithWrapper } from 'utils/tests';
import RemoveDialog from './RemoveDialog';
import { EpisodeContainer, useRemoveEpisode } from './hooks/episodes';
import { ShowContainer, useRemoveShow } from './hooks/shows';

describe('plugins/series/RemoveDialog', () => {
  describe.each`
    name         | path               | useRemove                       | Provider
    ${'Show'}    | ${'/1'}            | ${() => useRemoveShow(1)}       | ${ShowContainer.Provider}
    ${'Episode'} | ${'/1/episodes/1'} | ${() => useRemoveEpisode(1, 1)} | ${EpisodeContainer.Provider}
  `('$name', ({ name, path, Provider, useRemove }) => {
    const TestRemoveDialog = props => {
      const [state, request] = useRemove();

      return <RemoveDialog {...props} state={state} request={request} />;
    };

    beforeEach(() => {
      fetchMock
        .delete(`/api/series${path}`, 200)
        .get('/api/tasks', [])
        .catch();
    });
    afterEach(() => {
      cleanup();
      fetchMock.reset();
    });

    const handleClose = jest.fn();
    const component = (
      <Provider>
        <TestRemoveDialog open onClose={handleClose} name={name} />
      </Provider>
    );

    it('should find dialog when open', () => {
      const { queryByRole } = renderWithWrapper(component);

      expect(queryByRole('dialog')).toBeInTheDocument();
    });

    it('should not find dialog when closed', () => {
      const { queryByRole } = renderWithWrapper(
        <Provider>
          <TestRemoveDialog onClose={handleClose} name={name} />,
        </Provider>,
      );

      expect(queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should call request and close when pressing remove', async () => {
      const { getByRole } = renderWithWrapper(component);

      const submitButton = getByRole(
        (content, element) => content === 'button' && !!within(element).queryByText('Remove'),
      );

      fireEvent.click(submitButton);
      await wait(() => {
        expect(fetchMock.called(`/api/series${path}`)).toBeTrue();
        expect(handleClose).toHaveBeenCalled();
      });
    });

    it('should only call close when pressing cancel', async () => {
      const { getByRole } = renderWithWrapper(component);

      const submitButton = getByRole(
        (content, element) => content === 'button' && !!within(element).queryByText('Cancel'),
      );

      fireEvent.click(submitButton);
      await wait(() => {
        expect(fetchMock.called(`/api/series${path}`)).toBeFalse();
        expect(handleClose).toHaveBeenCalled();
      });
    });
  });
});
