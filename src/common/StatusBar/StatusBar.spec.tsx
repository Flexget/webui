import React from 'react';
import { mount } from 'enzyme';
import StatusBar from 'common/StatusBar';
import renderer from 'react-test-renderer';
import { themed } from 'utils/tests';

describe('common/StatusBar', () => {
  it('should render nothing if unopened', () => {
    const statusbar = <StatusBar open={false} clearStatus={jest.fn()} />;
    const wrapper = mount(themed(statusbar));statusbar
    expect(wrapper.html()).toBeCloseTo
  });
});
