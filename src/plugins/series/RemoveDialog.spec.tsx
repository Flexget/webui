import React from 'react';
import { cleanup, render, fireEvent, within, wait } from '@testing-library/react';
import { APIResponse } from 'utils/fetch';
import RemoveDialog from './RemoveDialog';

describe('plugins/series/RemoveDialog', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  const handleClose = jest.fn();
  const request = jest.fn(() => Promise.resolve(new Response() as APIResponse<unknown>));
  const component = (
    <RemoveDialog
      open
      onClose={handleClose}
      request={request}
      state={{ loading: false }}
      name="Test"
    />
  );

  it('should find dialog when open', () => {
    const { queryByRole } = render(component);

    expect(queryByRole('dialog')).toBeInTheDocument();
  });

  it('should not find dialog when closed', () => {
    const { queryByRole } = render(
      <RemoveDialog
        onClose={handleClose}
        request={request}
        state={{ loading: false }}
        name="Test"
      />,
    );

    expect(queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should call fetch when pressing remove', async () => {
    const { getByRole } = render(component);

    const submitButton = getByRole(
      (content, element) => content === 'button' && !!within(element).queryByText('Remove'),
    );

    fireEvent.click(submitButton);
    await wait(() => {
      expect(request).toHaveBeenCalled();
      expect(handleClose).toHaveBeenCalled();
    });
  });

  it('should call close when pressing cancel', async () => {
    const { getByRole } = render(component);

    const submitButton = getByRole(
      (content, element) => content === 'button' && !!within(element).queryByText('Cancel'),
    );

    fireEvent.click(submitButton);
    await wait(() => {
      expect(request).not.toHaveBeenCalled();
      expect(handleClose).toHaveBeenCalled();
    });
  });
});
