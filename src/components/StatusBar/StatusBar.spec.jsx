import React from 'react';
import StatusBar from 'components/StatusBar';
import renderer from 'react-test-renderer';
import { themed } from 'utils/tests';

describe('components/StatusBar', () => {
  it('renders correctly', () => {
    const statusbar = <StatusBar open={false} clearStatus={jest.fn()} />;
    const tree = renderer.create(themed(statusbar)).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
