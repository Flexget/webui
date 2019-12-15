import React, { FC } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { IconButton } from '@material-ui/core';
import { AuthContainer } from 'core/auth/container';
import { StatusContainer } from 'core/status/hooks';
import Navbar from './index';
import { NavbarContainer } from './hooks';

const TestNavbar: FC<{ toggle: () => void }> = ({ toggle }) => (
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

describe('core/layout/Navbar', () => {
  it('calls toggle when the hamburger button is pressed', () => {
    const toggle = jest.fn();
    const wrapper = mount(<TestNavbar toggle={toggle} />);

    wrapper
      .findWhere(el => el.props()['aria-label'] === 'toggle sidebar' && el.type() === IconButton)
      .simulate('click');

    expect(toggle).toHaveBeenCalled();
  });
});
