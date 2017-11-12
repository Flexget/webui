import React from 'react';
import TextField from 'components/TextField';
import renderer from 'react-test-renderer';
import { themed } from 'utils/tests';

describe('components/TextField', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      themed(<TextField input={{}} meta={{ error: true, touched: true }} />),
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
