import React from 'react';
import StatusBar from 'components/StatusBar';
import renderer from 'react-test-renderer';
import { themed } from 'utils/tests';

describe('components/StatusBar', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      themed(<StatusBar open={false} clearStatus={jest.fn()} />),
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
