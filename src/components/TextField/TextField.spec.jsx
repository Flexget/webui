import React from 'react';
import TextField from 'components/TextField';
import renderer from 'react-test-renderer';
import { themed } from 'utils/tests';

describe('components/TextField', () => {
  it('renders correctly', () => {
    const textFied = <TextField input={{}} meta={{ error: true, touched: true }} />;
    const tree = renderer.create(themed(textFied)).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
