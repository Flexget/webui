import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { AuthContainer } from 'core/auth/container';
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
    fetchMock
      .get('/api/tasks', [])
      .post('/api/auth/login', {})
      .catch();
  });

  afterEach(() => {
    cleanup();
    fetchMock.reset();
  });

  it('should call handleSubmit on submit', async () => {
    const { findByLabelText, getByRole } = renderWithWrapper(<TestLogin />);
    expect(await findByLabelText('login-state')).toHaveTextContent('false');

    const form = getByRole('form');
    fireEvent.submit(form);
    expect(await findByLabelText('login-state')).toHaveTextContent('true');
  });
});
