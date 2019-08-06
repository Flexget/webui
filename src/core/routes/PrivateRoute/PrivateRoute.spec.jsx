import React from 'react';
import { mapStateToProps, PrivateRoute } from 'core/routes/PrivateRoute';
import renderer from 'react-test-renderer';
import { router } from 'utils/tests';

const Component = () => <div />;

describe('core/routes/components/PrivateRoute', () => {
  describe('PrivateRoute', () => {
    it('renders correctly when logged in', () => {
      const privateRoute = <PrivateRoute component={Component} loggedIn />;
      const tree = renderer.create(router(privateRoute)).toJSON();
      expect(tree).toMatchSnapshot();
    });

    xit('renders correctly when logged out', () => {
      const privateRoute = <PrivateRoute component={Component} loggedIn={false} />;
      const tree = renderer.create(router(privateRoute)).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('mapStateToProps', () => {
    it('should return logged in if logged in', () => {
      expect(mapStateToProps({ auth: { loggedIn: true } })).toMatchSnapshot();
    });

    it('should return not logged in if logged out', () => {
      expect(mapStateToProps({ auth: {} })).toMatchSnapshot();
    });
  });
});
