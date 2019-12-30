import React from 'react';
import renderer from 'react-test-renderer';
import { themed } from 'utils/tests';
import { ReadyState } from 'core/api';
import Header from './Header';

describe('plugins/log/components/Header', () => {
  describe('Header', () => {
    it('renders correctly', () => {
      const tree = renderer
        .create(
          themed(
            <Header
              connect={jest.fn()}
              readyState={ReadyState.Open}
              disconnect={jest.fn()}
              options={{ query: '', lines: 400 }}
              setOptions={jest.fn()}
              clear={jest.fn()}
            />,
          ),
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
