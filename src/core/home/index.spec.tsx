import React from 'react';
import renderer from 'react-test-renderer';
import { AppBarContainer } from 'core/layout/AppBar/hooks';
import HomePage from './index';

describe('core/home/Home', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <AppBarContainer.Provider>
          <HomePage />
        </AppBarContainer.Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
