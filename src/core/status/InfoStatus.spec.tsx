import React, { FC } from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { useContainer } from 'unstated-next';
import { renderWithWrapper } from 'utils/tests';
import { StatusContainer, actions } from './hooks';
import InfoStatus from './InfoStatus';

const TestComponent: FC = () => {
  const [, dispatch] = useContainer(StatusContainer);
  return (
    <>
      <InfoStatus />
      <button type="button" onClick={() => dispatch(actions.pushInfo('test info'))}>
        push
      </button>
      <button type="button" onClick={() => dispatch(actions.popInfo())}>
        pop
      </button>
    </>
  );
};

describe('core/status/InfoStatus', () => {
  it('shows nothing initially', () => {
    renderWithWrapper(<TestComponent />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows the info message when pushed', async () => {
    renderWithWrapper(<TestComponent />);
    fireEvent.click(screen.getByText('push'));
    expect(await screen.findByRole('alert')).toHaveTextContent('test info');
  });

  it('clears the message when popped', async () => {
    renderWithWrapper(<TestComponent />);
    fireEvent.click(screen.getByText('push'));
    await screen.findByRole('alert');
    fireEvent.click(screen.getByText('pop'));
    await waitFor(() => expect(screen.queryByText('test info')).not.toBeInTheDocument());
  });
});
