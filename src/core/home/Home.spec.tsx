import React from 'react';
import renderer from 'react-test-renderer';
import { NavbarContainer } from 'core/layout/Navbar/hooks';
import HomePage from './Home';

describe('core/home/Home', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <NavbarContainer.Provider>
          <HomePage />
        </NavbarContainer.Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
