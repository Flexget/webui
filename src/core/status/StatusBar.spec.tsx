import React from 'react';
import { render, screen } from '@testing-library/react';
import { themed } from 'utils/tests';
import StatusBar from './StatusBar';

describe('core/status/StatusBar', () => {
  it('should render nothing if no message', () => {
    render(themed(<StatusBar clearStatus={jest.fn()} />));
    expect(screen.queryByText(/./)).not.toBeInTheDocument();
  });

  it('should render text if there is a message', () => {
    render(themed(<StatusBar clearStatus={jest.fn()} message="I'm open" />));
    expect(screen.getByText("I'm open")).toBeInTheDocument();
  });
});
