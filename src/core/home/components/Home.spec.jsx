import React from 'react';
import renderer from 'react-test-renderer';
import { themed } from 'utils/tests';
import HomePage from 'core/home/components';

describe('core/home/components/Home', () => {
  it('renders correctly', () => {
    const tree = renderer.create(themed(<HomePage />)).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
