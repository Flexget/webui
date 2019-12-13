import React, { FC } from 'react';
import { mount } from 'enzyme';
import ErrorStatus from './ErrorStatus';
import { StatusContainer, actions } from './hooks';

const TestComponent: FC = () => {
  const [, dispatch] = StatusContainer.useContainer();

  const push = (event: any) => dispatch(actions.pushError(new Error(event.message)));
  const pop = () => dispatch(actions.popError());

  return (
    <>
      <ErrorStatus />
      <button id="push" type="button" onClick={push}>
        Push Button
      </button>
      <button id="pop" type="button" onClick={pop}>
        Pop Button
      </button>
    </>
  );
};

describe('core/status/ErrorStatus', () => {
  it('should render text if there is a message', () => {
    const wrapper = mount(
      <StatusContainer.Provider>
        <TestComponent />
      </StatusContainer.Provider>,
    );

    const pushButton = wrapper.find('#push');
    const popButton = wrapper.find('#pop');

    expect(wrapper.find(ErrorStatus).text()).toBeEmpty();

    pushButton.simulate('click', { message: 'first message' });

    expect(wrapper.find(ErrorStatus).text()).toInclude('first message');
    pushButton.simulate('click', { message: 'second message' });

    expect(wrapper.find(ErrorStatus).text()).toInclude('first message');

    popButton.simulate('click');
    expect(wrapper.find(ErrorStatus).text()).toInclude('second message');

    popButton.simulate('click');
    expect(wrapper.find(ErrorStatus).text()).toBeEmpty();
  });
});
