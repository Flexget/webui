import React from 'react';
import { mount } from 'enzyme';
import { themed } from 'utils/tests';
import StatusBar from './StatusBar';

describe('core/status/StatusBar', () => {
  it('should render nothing if no message', () => {
    const wrapper = mount(themed(<StatusBar clearStatus={jest.fn()} />));
    expect(wrapper.html()).toBeEmpty();
  });

  it('should render text if there is a message', () => {
    const wrapper = mount(themed(<StatusBar clearStatus={jest.fn()} message="I'm open" />));
    expect(wrapper.text()).toInclude("I'm open");
  });
});
