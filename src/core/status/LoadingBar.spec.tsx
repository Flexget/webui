import React, { FC } from 'react';
import { mount } from 'enzyme';
import { StatusContainer, actions } from './hooks';
import LoadingBar from './LoadingBar';

const TestComponent: FC = () => {
  const [, dispatch] = StatusContainer.useContainer();

  const start = (event: any) => dispatch(actions.setLoading(event.id, true));
  const stop = (event: any) => dispatch(actions.setLoading(event.id, false));

  return (
    <>
      <LoadingBar />
      <button id="start" type="button" onClick={start}>
        Start Button
      </button>
      <button id="stop" type="button" onClick={stop}>
        Stop Button
      </button>
    </>
  );
};

describe('core/status/LoadingBar', () => {
  it('should render the loading bar if loading', () => {
    const wrapper = mount(
      <StatusContainer.Provider>
        <TestComponent />
      </StatusContainer.Provider>,
    );

    const startButton = wrapper.find('#start');
    const stopButton = wrapper.find('#stop');

    expect(wrapper.find(LoadingBar).text()).toBeEmpty();

    startButton.simulate('click', { id: 'first' });
    expect(wrapper.find(LoadingBar).html()).not.toBeEmpty();
    startButton.simulate('click', { id: 'second' });
    expect(wrapper.find(LoadingBar).html()).not.toBeEmpty();

    stopButton.simulate('click', { id: 'first' });

    expect(wrapper.find(LoadingBar).html()).not.toBeEmpty();

    stopButton.simulate('click', { id: 'second' });

    expect(wrapper.find(LoadingBar).html()).toBeNil();
  });
});
