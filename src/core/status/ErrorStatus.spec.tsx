import React from 'react';
import { mount } from 'enzyme';
import { themed, provider } from 'utils/tests';
import ErrorStatus from './ErrorStatus';
import { StatusContainer } from './hooks';

describe('core/status/ErrorStatus', () => {
  it('should render nothing if no message', () => {
    const wrapper = mount(
      themed(
        provider(
          <StatusContainer.Provider>
            <ErrorStatus />
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
          <StatusContainer.Provider initialState={{ error: 'you messed up' }}>
            <ErrorStatus />
          </StatusContainer.Provider>,
          { status: {} },
        ),
      ),
    );
    expect(wrapper.text()).toInclude('you messed up');
  });
});
