import React from 'react';
import { mount } from 'enzyme';
import { themed, provider } from 'utils/tests';
import InfoStatus from './InfoStatus';
import { StatusContainer } from './hooks';

describe('core/status/InfoStatus', () => {
  it('should render nothing if no message', () => {
    const wrapper = mount(
      themed(
        provider(
          <StatusContainer.Provider>
            <InfoStatus />
          </StatusContainer.Provider>,
          { status: {} },
        ),
      ),
    );
    expect(wrapper.html()).toBeEmpty();
  });

  it('should render text if there is a message', () => {
    const wrapper = mount(
      themed(
        provider(
          <StatusContainer.Provider initialState={{ info: 'some info', error: 'some error' }}>
            <InfoStatus />
          </StatusContainer.Provider>,
          { status: {} },
        ),
      ),
    );
    expect(wrapper.text()).toInclude('some info');
  });
});
