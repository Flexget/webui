import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Navbar } from 'core/layout/components/Navbar';
import { themed, router } from 'utils/tests';
import { NavIcon } from './styles';

function renderNavbar(toggle, logout) {
  return router(themed(<Navbar
    toggle={toggle}
    logout={logout}
    reloadServer={jest.fn()}
    shutdownServer={jest.fn()}
    classes={{}}
    titleMap={{}}
  />));
}

describe('core/layout/components/Navbar', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      renderNavbar(jest.fn(), jest.fn())
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  xit('calls toggle when the hamburger button is pressed', () => {
    const toggle = jest.fn();
    const logout = jest.fn();
    const wrapper = shallow(<Navbar
      toggle={toggle}
      logout={logout}
      classes={{}}
      reloadServer={jest.fn()}
      shutdownServer={jest.fn()}
      titleMap={{}}
    />);

    wrapper.find('.fa-bars').closest(NavIcon).simulate('click');
    expect(toggle).toHaveBeenCalled();
  });

  xit('calls handleMenuClick when the menu button is pressed', () => {
    const toggle = jest.fn();
    const logout = jest.fn();
    const target = { a: 'target' };
    const wrapper = shallow(<Navbar
      toggle={toggle}
      logout={logout}
      classes={{}}
      reloadServer={jest.fn()}
      shutdownServer={jest.fn()}
      titleMap={{}}
    />);

    const button = wrapper.find('.fa-cog').closest(NavIcon);

    button.simulate('click', { currentTarget: target });
    expect(wrapper.state().menuOpen).toEqual(true);
    expect(wrapper.state().anchorEl).toEqual(target);
  });
});
