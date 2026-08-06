import React from 'react';
import { cleanup, fireEvent, waitFor } from '@testing-library/react';
import { renderWithWrapper } from 'utils/tests';
import fetchMock from 'fetch-mock';
import AddShowDialog from './AddShowDialog';
import { Show } from '../types';
import { ShowContainer } from '../hooks/shows';

const TestAddShowDialog: typeof AddShowDialog = props => {
  return (
    <ShowContainer.Provider>
      <AddShowDialog {...props} />
    </ShowContainer.Provider>
  );
};

describe('plugins/series/Shows/AddShowDialog', () => {
  const show: Show = {
    name: 'show 1',
    id: 2,
    alternateNames: [],
    inTasks: ['task 1'],
  };
  beforeEach(() => {
    fetchMock.post('/api/series', show).catch();
  });

  afterEach(() => {
    cleanup();
    fetchMock.reset();
  });

  const handleClose = jest.fn();
  const component = <TestAddShowDialog open onClose={handleClose} />;

  it('should find dialog when open', () => {
    const { queryByRole } = renderWithWrapper(component);

    expect(queryByRole('dialog')).toBeInTheDocument();
  });

  it('should not find dialog when closed', () => {
    const { queryByRole } = renderWithWrapper(<TestAddShowDialog onClose={handleClose} />);

    expect(queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should call fetch when pressing add', async () => {
    const { getByRole } = renderWithWrapper(component);

    const submitButton = getByRole('button', { name: 'Add' });

    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(fetchMock.called('/api/series')).toBeTrue();
      expect(handleClose).toHaveBeenCalled();
    });
  });

  it('should call close when pressing cancel', () => {
    const { getByRole } = renderWithWrapper(component);

    const cancelButton = getByRole('button', { name: 'Cancel' });

    fireEvent.click(cancelButton);
    expect(fetchMock.called('/api/series')).toBeFalse();
    expect(handleClose).toHaveBeenCalled();
  });
});
