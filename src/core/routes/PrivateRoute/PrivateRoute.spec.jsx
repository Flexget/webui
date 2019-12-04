import React from 'react';
import PrivateRoute from 'core/routes/PrivateRoute';
import renderer from 'react-test-renderer';
import { router, authProvider } from 'utils/tests';

const Component = () => <div />;

describe('core/routes/components/PrivateRoute', () => {
  describe('PrivateRoute', () => {
    it('renders correctly when logged in', () => {
      const privateRoute = <PrivateRoute component={Component} />;
      const tree = renderer.create(authProvider(router(privateRoute), true)).toJSON();
      expect(tree).toMatchSnapshot();
    });

    xit('renders correctly when logged out', () => {
      const privateRoute = <PrivateRoute component={Component} />;
      const tree = renderer.create(authProvider(router(privateRoute))).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
