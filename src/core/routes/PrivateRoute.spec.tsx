import React from 'react';
import { mount, shallow } from 'enzyme';
import PrivateRoute from 'core/routes/PrivateRoute';
import { AuthContainer } from 'core/auth/container';
import { MemoryRouter } from 'react-router';

const Component = () => <div />;

describe('core/routes/components/PrivateRoute', () => {
  describe('PrivateRoute', () => {
    it('renders correctly when logged in', () => {
      const wrapper = mount(
        <AuthContainer.Provider initialState>
          <MemoryRouter>
            <PrivateRoute component={Component} />
          </MemoryRouter>
        </AuthContainer.Provider>,
      );
      expect(wrapper).toBeEmpty();
      expect(wrapper.html()).toBeDefined();
    });

    it('renders correctly when logged out', () => {
      const wrapper = shallow(
        <AuthContainer.Provider>
          <MemoryRouter>
            <PrivateRoute component={Component} />
          </MemoryRouter>
        </AuthContainer.Provider>,
      );
      expect(wrapper.html()).toBeEmpty();
    });
  });
});
