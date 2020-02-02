import React from 'react';
import { create } from 'react-test-renderer';
import { router, themed } from 'utils/tests';
import { AuthContainer } from 'core/auth/hooks';
import Login from './Login';

describe('core/auth/Login', () => {
  it('renders correctly when logged in', () => {
    const tree = create(
      <AuthContainer.Provider initialState>{router(themed(<Login />))}</AuthContainer.Provider>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders correctly when logged out', () => {
    const tree = create(
      <AuthContainer.Provider>{router(themed(<Login />))}</AuthContainer.Provider>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
