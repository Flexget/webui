import React from 'react';
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { AuthContainer } from 'core/auth/hooks';
import { renderWithWrapper } from 'utils/tests';
import LoginCard from './LoginCard';

const TestLogin = () => {
  const [loggedIn] = AuthContainer.useContainer();

  return (
    <>
      <div aria-label="login-state">{`${loggedIn}`}</div>
      <LoginCard />
    </>
  );
};

describe('core/Login/LoginCard', () => {
  beforeEach(() => {
    fetchMock.post('/api/auth/login', {}).catch();
  });

  afterEach(() => {
    cleanup();
    fetchMock.reset();
  });

  it('should call handleSubmit on submit', async () => {
    const { container } = renderWithWrapper(<TestLogin />);
    expect(screen.getByLabelText('login-state')).toHaveTextContent('false');

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const form = container.querySelector('form')!;
    fireEvent.submit(form);
    await waitFor(() => expect(screen.getByLabelText('login-state')).toHaveTextContent('true'));
  });
});
