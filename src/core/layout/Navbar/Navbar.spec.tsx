import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { IconButton } from '@material-ui/core';
import { AuthContainer } from 'core/auth/container';
import { StatusContainer } from 'core/status/hooks';
import Navbar from './index';
import { NavbarContainer } from './hooks';

const renderNavbar = (toggle: () => void) => (
  <StatusContainer.Provider>
    <AuthContainer.Provider>
      <MemoryRouter>
        <NavbarContainer.Provider>
          <Navbar toggleSidebar={toggle} />
        </NavbarContainer.Provider>
      </MemoryRouter>
    </AuthContainer.Provider>
  </StatusContainer.Provider>
);

describe('core/layout/components/Navbar', () => {
  it('renders correctly', () => {
    const tree = renderer.create(renderNavbar(jest.fn())).toJSON();
    expect(tree).toMatchSnapshot();
  });

  xit('calls toggle when the hamburger button is pressed', () => {
    const toggle = jest.fn();
    const wrapper = shallow(<Navbar toggleSidebar={toggle} />);

    wrapper
      .find('.fa-bars')
      .closest(IconButton)
      .simulate('click');
    expect(toggle).toHaveBeenCalled();
  });

  xit('calls handleMenuClick when the menu button is pressed', () => {
    const toggle = jest.fn();
    const target = { a: 'target' };
    const wrapper = shallow(<Navbar toggleSidebar={toggle} />);

    const button = wrapper.find('.fa-cog').closest(IconButton);

    button.simulate('click', { currentTarget: target });
    // expect(wrapper.state().menuOpen).toEqual(true);
    // expect(wrapper.state().anchorEl).toEqual(target);
  });
});
