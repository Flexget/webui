import React from 'react';
import { shallow } from 'enzyme';
import { History } from 'plugins/history/History';

describe('plugins/history/components', () => {
  it('renders correctly', () => {
    const tree = shallow(<History getHistory={jest.fn()} />);
    expect(tree).toMatchSnapshot();
  });
});
