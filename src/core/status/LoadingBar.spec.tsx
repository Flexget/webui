import React, { FC } from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { useContainer } from 'unstated-next';
import { renderWithWrapper } from 'utils/tests';
import { StatusContainer, actions } from './hooks';
import LoadingBar from './LoadingBar';

const TestComponent: FC = () => {
  const [, dispatch] = useContainer(StatusContainer);
  return (
    <>
      <LoadingBar />
      <button type="button" onClick={() => dispatch(actions.setLoading('first', true))}>
        start first
      </button>
      <button type="button" onClick={() => dispatch(actions.setLoading('second', true))}>
        start second
      </button>
      <button type="button" onClick={() => dispatch(actions.setLoading('first', false))}>
        stop first
      </button>
      <button type="button" onClick={() => dispatch(actions.setLoading('second', false))}>
        stop second
      </button>
    </>
  );
};

describe('core/status/LoadingBar', () => {
  it('should render the loading bar if loading', () => {
    renderWithWrapper(<TestComponent />);

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('start first'));
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    fireEvent.click(screen.getByText('start second'));
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    fireEvent.click(screen.getByText('stop first'));
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    fireEvent.click(screen.getByText('stop second'));
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
});
