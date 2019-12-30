import React from 'react';
import { shallow } from 'enzyme';
import { themed } from 'utils/tests';
import LogTable from './LogTable';

describe('plugins/log/LogTable', () => {
  describe('LogTable', () => {
    it('renders correctly', () => {
      const wrapper = shallow(themed(<LogTable messages={[]} />));
      expect(wrapper).toMatchSnapshot();
    });
  });
});
