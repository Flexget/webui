import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import LoginCardFull, { LoginCard } from 'core/auth/components/LoginCard/LoginCard';
import { mapStateToProps } from 'core/auth/components/LoginCard';
import { themed, provider } from 'utils/tests';

describe('core/Login/LoginCard', () => {
  describe('LoginCard', () => {
    it('renders correctly', () => {
      const tree = renderer.create(provider(themed(<LoginCardFull />))).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should call handleSubmit on submit', () => {
      const handleSubmit = jest.fn();
      const wrapper = shallow(<LoginCard
        handleSubmit={handleSubmit}
        classes={{}}
      />);

      wrapper.find('form').simulate('submit');
      expect(handleSubmit).toHaveBeenCalled();
    });
  });


  describe('mapStateToProps', () => {
    it('should return no errors if there are none', () => {
      expect(mapStateToProps({ status: { } })).toMatchSnapshot();
    });

    it('should return errors if there are errors', () => {
      expect(mapStateToProps({ status: { error: { message: 'Invalid Credentials' } } })).toMatchSnapshot();
    });
  });
});
