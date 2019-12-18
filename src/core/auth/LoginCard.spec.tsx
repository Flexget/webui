import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { mount } from 'enzyme';
import { AuthContainer } from 'core/auth/container';
import LoginCard from './LoginCard';

const TestLogin = () => {
  const [loggedIn] = AuthContainer.useContainer();

  return (
    <>
      <div id="state">{`${loggedIn}`}</div>
      <LoginCard />
    </>
  );
};

describe('core/Login/LoginCard', () => {
  describe('LoginCard', () => {
    it('renders correctly', () => {
      const tree = renderer
        .create(
          <AuthContainer.Provider>
            <LoginCard />
          </AuthContainer.Provider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should call handleSubmit on submit', async () => {
      fetchMock.mockResponse(JSON.stringify({}));
      const wrapper = mount(
        <AuthContainer.Provider>
          <TestLogin />
        </AuthContainer.Provider>,
      );

      expect(wrapper.find('#state').text()).toBe('false');
      await act(async () => {
        wrapper.find('form').simulate('submit');
      });
      expect(wrapper.find('#state').text()).toBe('true');
    });
  });
});
