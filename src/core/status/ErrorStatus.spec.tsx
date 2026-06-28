import React, { FC } from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { useContainer } from 'unstated-next';
import { renderWithWrapper } from 'utils/tests';
import { StatusContainer, actions } from './hooks';
import ErrorStatus from './ErrorStatus';

const TestComponent: FC = () => {
  const [, dispatch] = useContainer(StatusContainer);
  return (
    <>
      <ErrorStatus />
      <button type="button" onClick={() => dispatch(actions.pushError(new Error('test error')))}>
        push
      </button>
      <button type="button" onClick={() => dispatch(actions.popError())}>
        pop
      </button>
    </>
  );
};

describe('core/status/ErrorStatus', () => {
  it('shows nothing initially', () => {
    renderWithWrapper(<TestComponent />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows the error message when pushed', async () => {
    renderWithWrapper(<TestComponent />);
    fireEvent.click(screen.getByText('push'));
    expect(await screen.findByRole('alert')).toHaveTextContent('test error');
  });

  it('clears the message when popped', async () => {
    renderWithWrapper(<TestComponent />);
    fireEvent.click(screen.getByText('push'));
    await screen.findByRole('alert');
    fireEvent.click(screen.getByText('pop'));
    // Snackbar stays in DOM during exit transition; check message text is gone
    await waitFor(() => expect(screen.queryByText('test error')).not.toBeInTheDocument());
  });
});
