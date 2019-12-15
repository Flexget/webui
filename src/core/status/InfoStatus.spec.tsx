import React, { FC } from 'react';
import { mount } from 'enzyme';
import { useContainer } from 'unstated-next';
import InfoStatus from './InfoStatus';
import { StatusContainer, actions } from './hooks';

const TestComponent: FC = () => {
  const [, dispatch] = useContainer(StatusContainer);

  const push = (event: any) => dispatch(actions.pushInfo(event.message));
  const pop = () => dispatch(actions.popInfo());

  return (
    <>
      <InfoStatus />
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

    expect(wrapper.find(InfoStatus).text()).toBeEmpty();

    pushButton.simulate('click', { message: 'first message' });

    expect(wrapper.find(InfoStatus).text()).toInclude('first message');
    pushButton.simulate('click', { message: 'second message' });

    expect(wrapper.find(InfoStatus).text()).toInclude('first message');

    popButton.simulate('click');
    expect(wrapper.find(InfoStatus).text()).toInclude('second message');

    popButton.simulate('click');
    expect(wrapper.find(InfoStatus).text()).toBeEmpty();
  });
});
