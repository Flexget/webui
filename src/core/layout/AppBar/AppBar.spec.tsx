import React, { FC } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { IconButton } from '@material-ui/core';
import { AuthContainer } from 'core/auth/container';
import { StatusContainer } from 'core/status/hooks';
import ThemeProvider from 'core/theme/ThemeProvider';
import AppBar from './index';
import { AppBarContainer } from './hooks';

const TestAppBar: FC<{ toggle: () => void }> = ({ toggle }) => (
  <ThemeProvider>
    <StatusContainer.Provider>
      <AuthContainer.Provider>
        <MemoryRouter>
          <AppBarContainer.Provider>
            <AppBar toggleSidebar={toggle} />
          </AppBarContainer.Provider>
        </MemoryRouter>
      </AuthContainer.Provider>
    </StatusContainer.Provider>
  </ThemeProvider>
);

describe('core/layout/AppBar', () => {
  it('calls toggle when the hamburger button is pressed', () => {
    const toggle = jest.fn();
    const wrapper = mount(<TestAppBar toggle={toggle} />);

    wrapper
      .findWhere(el => el.props()['aria-label'] === 'toggle sidebar' && el.type() === IconButton)
      .simulate('click');

    expect(toggle).toHaveBeenCalled();
  });
});
