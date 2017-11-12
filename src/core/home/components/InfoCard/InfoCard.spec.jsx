import React from 'react';
import renderer from 'react-test-renderer';
import InfoCard from 'core/home/components/InfoCard';
import { themed } from 'utils/tests';

describe('core/home/components/InfoCard', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      themed(<InfoCard />),
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
